# Patrón de cierre nativo y recuperación de borrador local

> Documento de transferencia técnica desde Medo hacia otro proyecto de aplicación de escritorio, especialmente un procesador de texto para escritores.  
> Objetivo: dejar claro qué sistema de cierre funcionó, qué sistema rompió la app, y cómo implementar recuperación segura de borradores sin interceptar el cierre nativo de Tauri/Windows.

---

## 1. Principio general

En una app de escritorio de escritura, el cierre de ventana debe ser confiable.  
La prioridad es que el botón nativo de cerrar ventana funcione siempre.

La experiencia de Medo dejó una lección clara:

```text
No conviene interceptar el cierre nativo de ventana si eso rompe la capacidad básica de cerrar la app.
```

El enfoque que terminó funcionando fue:

```text
Cerrar ventana = cierre nativo de Tauri/Windows
Protección ante pérdida = borrador local + recuperación al iniciar
Confirmación modal = solo para acciones internas como Nuevo o Abrir
```

---

## 2. Qué NO hacer

En Medo se intentó implementar un sistema de cierre interceptado con Tauri:

```ts
getCurrentWindow().onCloseRequested(...)
getCurrentWindow().close()
pendingAction = "close"
allowWindowCloseRef
closeInProgressRef
```

Ese enfoque generó problemas:

- la app dejó de cerrar correctamente;
- el botón X de Windows quedaba atrapado;
- el cierre programático requería capabilities específicas;
- incluso agregando `core:window:allow-close`, el flujo siguió siendo frágil;
- se acumuló lógica compleja para algo que el sistema operativo ya resuelve bien.

Conclusión:

```text
No interceptar la X de la ventana salvo que sea absolutamente necesario.
```

Para una app de escritura, es preferible que cerrar siempre funcione y que la app recupere el borrador al abrir.

---

## 3. Qué SÍ hacer

### 3.1. Usar cierre nativo

La ventana debe cerrar normalmente con el botón X del sistema operativo.

En React/Tauri:

- no registrar `onCloseRequested`;
- no llamar a `getCurrentWindow().close()` desde React;
- no tener `pendingAction = "close"`;
- no usar flags de cierre programático;
- no depender de `core:window:allow-close` si no se hace cierre programático.

El cierre debe quedar en manos de Tauri/Windows.

---

## 4. Protección contra pérdida de texto

Como no interceptamos el cierre de ventana, la protección contra pérdida se basa en:

1. guardar borrador local mientras el usuario escribe;
2. limpiar el borrador cuando el documento queda guardado;
3. recuperar el borrador al iniciar si quedó contenido pendiente.

Esto cubre:

- cierre con X;
- cierre inesperado;
- apagón;
- finalización del proceso desde Administrador de tareas;
- cierre rápido antes de guardar.

---

## 5. Confirmación modal: solo para acciones internas

La app sí debe mostrar modal de confirmación cuando el usuario intenta hacer una acción interna que reemplaza el documento actual.

Ejemplos:

```text
Nuevo
Abrir
```

Si hay cambios pendientes y el usuario pulsa `Nuevo` o `Abrir`, mostrar:

```text
Guardar
Descartar
Cancelar
```

Pero la X de la ventana no debe pasar por ese modal.

### Comportamiento esperado

#### Nuevo con cambios pendientes

```text
Usuario pulsa Nuevo
Hay cambios sin guardar
Mostrar modal
- Guardar: guarda y crea documento nuevo
- Descartar: descarta y crea documento nuevo
- Cancelar: mantiene documento actual
```

#### Abrir con cambios pendientes

```text
Usuario pulsa Abrir
Hay cambios sin guardar
Mostrar modal
- Guardar: guarda y luego abre selector
- Descartar: descarta y luego abre selector
- Cancelar: mantiene documento actual
```

#### Cerrar ventana con X

```text
Usuario pulsa X
La app cierra nativamente
Si había cambios, el borrador local debe permitir recuperación al reiniciar
```

---

## 6. Modelo de estado recomendado

Un documento puede tener:

```ts
type DocumentState = {
  content: string;
  path?: string;
  displayName: string;
  hasUnsavedChanges: boolean;
  lastSavedContent: string;
};
```

Campos importantes:

- `content`: texto actual.
- `path`: ruta en disco si existe.
- `displayName`: nombre visible.
- `hasUnsavedChanges`: si hay cambios pendientes.
- `lastSavedContent`: contenido del último guardado exitoso.

---

## 7. Persistencia de borrador local

### 7.1. Clave de almacenamiento

Usar una clave estable:

```ts
const draftStorageKey = "app.localDraft.v1";
```

En Medo:

```ts
const draftStorageKey = "medo.localDraft.v1";
```

Para otro proyecto, cambiar el prefijo.

---

### 7.2. Estructura del borrador

```ts
type LocalDraftSnapshot = {
  content: string;
  displayName: string;
};
```

Puede ampliarse en otro proyecto:

```ts
type LocalDraftSnapshot = {
  content: string;
  displayName: string;
  projectId?: string;
  documentId?: string;
  updatedAt: string;
};
```

---

## 8. Debounce de escritura

No escribir en `localStorage` en cada tecla.

Motivo:

```text
JSON.stringify(document.content) + localStorage.setItem(...) son operaciones síncronas.
```

En textos largos pueden trabar:

- escritura;
- scroll;
- respuesta del editor.

Usar debounce corto:

```ts
export const draftWriteDelayMs = 400;
```

Esto evita guardar en cada tecla, pero sigue siendo suficientemente rápido para recuperación.

---

## 9. Helper de flush

Crear un helper testeable:

```ts
export const draftWriteDelayMs = 400;

export type LocalDraftSnapshot = {
  content: string;
  displayName: string;
};

export function flushDraftToStorage(
  storage: Pick<Storage, "setItem">,
  key: string,
  draft: LocalDraftSnapshot | null
): void {
  if (!draft) return;
  storage.setItem(key, JSON.stringify(draft));
}
```

Ventajas:

- testeable sin React;
- evita duplicar lógica;
- permite verificar que no se escribe si el draft es `null`.

---

## 10. Implementación React recomendada

Patrón usado después del fix:

```ts
const latestDraftRef = useRef<LocalDraftSnapshot | null>(null);
const draftTimerRef = useRef<number | null>(null);

const cancelDraftTimer = useCallback(() => {
  if (draftTimerRef.current === null) return;
  window.clearTimeout(draftTimerRef.current);
  draftTimerRef.current = null;
}, []);

const flushDraft = useCallback(() => {
  cancelDraftTimer();
  flushDraftToStorage(localStorage, draftStorageKey, latestDraftRef.current);
}, [cancelDraftTimer]);

const clearDraft = useCallback(() => {
  latestDraftRef.current = null;
  cancelDraftTimer();
  localStorage.removeItem(draftStorageKey);
}, [cancelDraftTimer]);
```

---

## 11. Guardar borrador con debounce

```ts
useEffect(() => {
  if (!document.hasUnsavedChanges) {
    clearDraft();
    return;
  }

  latestDraftRef.current = {
    content: document.content,
    displayName: document.displayName
  };

  cancelDraftTimer();

  draftTimerRef.current = window.setTimeout(() => {
    flushDraft();
  }, draftWriteDelayMs);
}, [
  cancelDraftTimer,
  clearDraft,
  document.content,
  document.displayName,
  document.hasUnsavedChanges,
  flushDraft
]);
```

### Qué logra

- Si no hay cambios pendientes, limpia todo.
- Si hay cambios, actualiza snapshot en memoria.
- Espera aproximadamente 400ms antes de escribir.
- Evita escrituras por tecla.
- Si llega un cambio nuevo, cancela el timer anterior.

---

## 12. Flush final al cerrar o esconder ventana

Aunque no interceptamos el cierre, podemos aprovechar eventos del navegador/webview para hacer un último intento de persistencia.

```ts
useEffect(() => {
  const flushOnHide = () => flushDraft();

  const onVisibilityChange = () => {
    if (globalThis.document.visibilityState === "hidden") {
      flushDraft();
    }
  };

  window.addEventListener("pagehide", flushOnHide);
  window.addEventListener("beforeunload", flushOnHide);
  globalThis.document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    window.removeEventListener("pagehide", flushOnHide);
    window.removeEventListener("beforeunload", flushOnHide);
    globalThis.document.removeEventListener("visibilitychange", onVisibilityChange);
    cancelDraftTimer();
  };
}, [cancelDraftTimer, flushDraft]);
```

Importante:

```text
Estos eventos no deben mostrar prompts.
No deben bloquear el cierre.
No deben llamar APIs Tauri de cierre.
Solo hacen flush si hay draft vigente.
```

---

## 13. Evitar borradores viejos o stale drafts

Este fue un bug importante detectado en Medo.

### Problema

Si se guarda o descarta el documento, pero queda un snapshot viejo en memoria, un evento `beforeunload` puede volver a escribir ese snapshot en `localStorage`.

Resultado:

```text
La app ofrece recuperar un borrador que ya había sido guardado o descartado.
```

### Solución

La limpieza debe ser coordinada.

Cuando se limpia el borrador, limpiar todo:

```ts
const clearDraft = useCallback(() => {
  latestDraftRef.current = null;
  cancelDraftTimer();
  localStorage.removeItem(draftStorageKey);
}, [cancelDraftTimer]);
```

No basta con:

```ts
localStorage.removeItem(draftStorageKey);
```

También hay que limpiar:

```ts
latestDraftRef.current = null;
draftTimerRef.current = null;
```

---

## 14. Cuándo llamar `clearDraft()`

Llamar `clearDraft()` cuando:

- el documento se guarda correctamente;
- `Guardar como` termina correctamente;
- el documento vuelve a `hasUnsavedChanges = false`;
- el usuario descarta cambios en `Nuevo`;
- el usuario descarta cambios en `Abrir`;
- el usuario descarta un borrador recuperado al inicio;
- se abre otro archivo correctamente.

Ejemplos:

```ts
const onSave = async () => {
  const saved = await saveDocument(document);
  setDocument(saved);
  clearDraft();
};

const onSaveAs = async () => {
  const saved = await saveDocumentAs(document);
  if (saved) {
    setDocument(saved);
    clearDraft();
  }
};
```

---

## 15. Recuperación al iniciar

Al iniciar la app:

```ts
useEffect(() => {
  const rawDraft = localStorage.getItem(draftStorageKey);
  if (!rawDraft) return;

  try {
    const draft = JSON.parse(rawDraft) as {
      content?: string;
      displayName?: string;
    };

    if (!draft.content) return;

    if (window.confirm("Se encontró un borrador local sin guardar. ¿Querés recuperarlo?")) {
      setDocument({
        content: draft.content,
        path: undefined,
        displayName: draft.displayName || UNTITLED_NAME,
        hasUnsavedChanges: true,
        lastSavedContent: ""
      });
    } else {
      clearDraft();
    }
  } catch {
    clearDraft();
  }
}, []);
```

### Reglas

- Si el usuario recupera, marcar como `hasUnsavedChanges: true`.
- Si descarta, limpiar draft.
- Si el JSON está roto, limpiar draft.

---

## 16. Tests mínimos recomendados

### 16.1. Helper de draft

```ts
it("no escribe si el draft es null", () => {
  const setItem = vi.fn();

  flushDraftToStorage({ setItem }, "app.localDraft.v1", null);

  expect(setItem).not.toHaveBeenCalled();
});
```

```ts
it("escribe correctamente si hay draft", () => {
  const setItem = vi.fn();
  const draft = { content: "# Título", displayName: "nota.md" };

  flushDraftToStorage({ setItem }, "app.localDraft.v1", draft);

  expect(setItem).toHaveBeenCalledWith(
    "app.localDraft.v1",
    JSON.stringify(draft)
  );
});
```

```ts
it("evita flush stale cuando el draft se limpia antes del flush", () => {
  const setItem = vi.fn();

  let latestDraft: LocalDraftSnapshot | null = {
    content: "viejo",
    displayName: "viejo.md"
  };

  const flush = () =>
    flushDraftToStorage({ setItem }, "app.localDraft.v1", latestDraft);

  latestDraft = null;
  flush();

  expect(setItem).not.toHaveBeenCalled();
});
```

---

## 17. Validación manual mínima

Después de implementar este patrón:

### Cierre nativo

```text
Abrir app
Cerrar con X
Debe cerrar
```

### Recuperación

```text
Abrir app
Escribir cambios
Cerrar rápido con X
Reabrir
Debe ofrecer recuperar borrador
```

### No recuperar si ya guardó

```text
Abrir app
Escribir cambios
Guardar
Cerrar rápido con X
Reabrir
No debe ofrecer recuperar borrador viejo
```

### No recuperar si descartó

```text
Abrir app
Escribir cambios
Nuevo
Elegir Descartar
Cerrar rápido con X
Reabrir
No debe ofrecer recuperar borrador viejo
```

### Acciones internas

```text
Abrir app
Escribir cambios
Nuevo
Debe mostrar modal de cambios pendientes
```

```text
Abrir app
Escribir cambios
Abrir
Debe mostrar modal de cambios pendientes
```

---

## 18. Manual de usuario: explicación recomendada

Texto sugerido:

```text
Si cerrás la ventana con cambios sin guardar, Medo conserva un borrador local para ofrecer recuperación al volver a abrir.
Para minimizar riesgos, se recomienda guardar antes de cerrar.
Las acciones Nuevo y Abrir sí muestran confirmación cuando hay cambios pendientes.
```

---

## 19. Reglas finales para otro proyecto

Para un procesador de texto de escritorio:

```text
1. No interceptar la X de la ventana si no es estrictamente necesario.
2. El cierre nativo debe funcionar siempre.
3. La protección real debe ser autoguardado/borrador local.
4. Las acciones internas destructivas sí deben pedir confirmación.
5. El borrador debe escribirse con debounce, no por tecla.
6. Al cerrar, hacer flush final sin bloquear.
7. Al limpiar draft, limpiar storage + timer + snapshot en memoria.
8. Nunca revivir un borrador viejo después de guardar o descartar.
```

---

## 20. Resumen ejecutivo

El sistema estable quedó así:

```text
Cierre de ventana:
  nativo de Tauri/Windows

Cambios pendientes al cerrar:
  se protegen por borrador local recuperable al iniciar

Nuevo/Abrir con cambios:
  modal Guardar / Descartar / Cancelar

Persistencia de borrador:
  debounce ~400ms + flush en pagehide/beforeunload/visibilitychange

Limpieza de borrador:
  localStorage + latestDraftRef + timer

Tests:
  helper de flush + anti stale draft
```

Este patrón es una buena base para cualquier app de escritura de escritorio donde cerrar la ventana debe ser confiable y la recuperación del texto debe estar garantizada por diseño.
