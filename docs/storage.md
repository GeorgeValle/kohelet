# docs/storage.md — Kohelet

> Documento de guardado local, autoguardado, snapshots, recuperación, formato de archivo y migraciones.  
> Prioridad máxima: no perder texto.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Principio rector

La prioridad técnica más importante de Kohelet es:

```text
No perder texto.
```

El storage debe proteger al escritor ante:

- cierre inesperado,
- error de la app,
- fallo parcial de guardado,
- proyecto corrupto,
- migración futura,
- cambio de escena sin guardar,
- corte de energía o bloqueo del sistema.

---

## 2. Alcance para 1.0

Requisitos:

```text
Crear proyecto local
Abrir proyecto local
Guardar proyecto local
Guardar como si aplica
Autoguardado configurable
Snapshots periódicos
Recuperación ante cierre inesperado
Indicador Guardado / Sin guardar
Validación básica de integridad
Migraciones futuras de estructura
```

Fuera de alcance antes de 1.0:

```text
Sincronización cloud
Colaboración multiusuario
Versionado Git interno
Adjuntos pesados
Backup remoto
```

---

## 3. Ubicación de la lógica

```text
src/lib/storage/
  projectStorage.ts
  autosaveStorage.ts
  snapshotStorage.ts
  recoveryStorage.ts
  migrations.ts
  projectFileFormat.ts
```

Reglas:

- Los componentes React no deben escribir archivos directamente.
- La lógica de Tauri/filesystem debe encapsularse en `lib/storage`.
- El editor Sofer no debe conocer detalles de rutas del sistema.
- El storage no debe depender de CSS ni UI.

---

## 4. Formato de archivo de proyecto

Formato conceptual:

```ts
export type KoheletProjectFile = {
  app: 'kohelet';
  schemaVersion: number;
  savedAt: string;
  storyWorld: StoryWorld;
};
```

Reglas:

- `app` identifica que el archivo pertenece a Kohelet.
- `schemaVersion` permite migraciones.
- `savedAt` registra el último guardado.
- `storyWorld` contiene el proyecto narrativo completo.
- El contenido debe ser serializable.

Extensión posible:

```text
.kohelet
```

Si se usa otra extensión, registrarla en `docs/decisions.md`.

---

## 5. JSON y validación

El archivo puede guardarse como JSON estructurado.

Reglas:

- Leer → parsear → validar → migrar si hace falta → usar.
- Nunca asumir que un archivo abierto es válido.
- Si hay error, mostrar opción de recuperación o abrir snapshot.
- No descartar campos desconocidos sin cuidado durante migraciones.

---

## 6. Autoguardado

Objetivo: reducir pérdida de texto sin interrumpir escritura.

Requisitos:

- autoguardado configurable,
- intervalo definido en settings,
- no bloquear el editor,
- mostrar estado visible,
- no sobrescribir un proyecto si la validación falla,
- evitar escrituras excesivas si no hubo cambios.

Estado sugerido:

```ts
export type SaveState =
  | 'saved'
  | 'dirty'
  | 'saving'
  | 'error'
  | 'recovered';
```

---

## 7. Snapshots

Los snapshots son copias de seguridad internas.

Objetivo:

- permitir volver a una versión previa,
- recuperar ante corrupción o cierre inesperado,
- dar una capa extra de seguridad.

Reglas:

- Crear snapshots periódicos.
- Crear snapshot antes de migraciones importantes.
- Limitar cantidad o antigüedad para no llenar disco.
- No confundir snapshot con exportación final.

Nombre conceptual:

```text
snapshots/project-title/YYYY-MM-DD-HH-mm-ss.kohelet
```

La ruta final dependerá de Tauri y sistema operativo.

---

## 8. Recovery

Recovery se activa cuando la app detecta datos no confirmados o cierre inesperado.

Requisitos:

- detectar estado recuperable,
- mostrar `RecoveryDialog`,
- permitir recuperar,
- permitir descartar con confirmación,
- no sobrescribir proyecto original sin acción clara.

Componentes sugeridos:

```text
RecoveryDialog.tsx
RecoveryDialog.module.css
```

---

## 9. Escritura segura

Para reducir corrupción:

```text
1. serializar proyecto,
2. validar estructura,
3. escribir a archivo temporal,
4. confirmar escritura,
5. reemplazar archivo principal,
6. actualizar estado Guardado.
```

Si Tauri o el sistema no permiten un paso exacto, implementar la alternativa más segura y documentarla.

---

## 10. Migraciones

Archivo:

```text
src/lib/storage/migrations.ts
```

Reglas:

- Toda migración debe tener tests.
- Toda migración debe preservar texto.
- Migraciones destructivas requieren decisión documentada.
- Si falla una migración, ofrecer abrir snapshot o backup.

Ejemplo conceptual:

```ts
export function migrateProjectFile(input: unknown): KoheletProjectFile {
  // parsear, detectar schemaVersion, aplicar pasos y validar
}
```

---

## 11. Preferencias de UI

Preferencias que pueden vivir fuera del archivo de proyecto:

```text
Tema: claro / oscuro / sistema
Estado del panel contextual
Ancho de paneles
Última ruta abierta
Preferencias de layout
```

Estas preferencias pueden usar storage local de Tauri o `localStorage` si son puramente UI.

Regla:

```text
localStorage nunca debe ser fuente principal del manuscrito.
```

---

## 12. Errores de storage

La UI debe comunicar errores importantes.

Ejemplos:

```text
No se pudo guardar.
No se pudo abrir el proyecto.
El archivo parece estar corrupto.
Se encontró una versión recuperable.
Se creó un snapshot antes de migrar.
```

Todos los textos deben salir de i18n.

---

## 13. Tauri y permisos

Tauri debe configurarse con permisos explícitos.

Reglas:

- No pedir permisos innecesarios.
- No acceder a rutas no seleccionadas sin motivo.
- Documentar comandos Tauri usados.
- Validar build de escritorio, no solo build web.

---

## 14. Testing de storage

Prioridades:

- crear proyecto válido,
- guardar proyecto,
- abrir proyecto,
- detectar archivo inválido,
- migrar versión vieja,
- preservar texto en migración,
- crear snapshot,
- recuperar desde recovery,
- no guardar datos corruptos como principal.

Cuando se testea sin Tauri real, usar mocks controlados.

---

## 15. Checklist para Codex

Antes de cerrar una tarea de storage:

- [ ] Se usó la skill `tauri-storage`.
- [ ] No se usó `localStorage` como manuscrito principal.
- [ ] Se preserva texto ante error.
- [ ] Se valida estructura al abrir.
- [ ] Se consideró snapshot/recovery si corresponde.
- [ ] Se agregaron tests o se justificó por qué no.
- [ ] Textos visibles están en i18n.
- [ ] Se actualizó `docs/task.md`.
- [ ] Se registró ADR si cambió formato de archivo o estrategia.
