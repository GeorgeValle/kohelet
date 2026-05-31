# docs/storage.md — Kohelet

> Documento de guardado local, autoguardado, snapshots, recuperación, formato de archivo y migraciones.  
> Prioridad máxima: no perder texto.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** primer corte de storage local seguro implementado
**Última revisión:** 2026-05-30

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
  projectFileFormat.ts
  projectValidation.ts
  storageErrors.ts
  migrations.ts
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

## 6. Primer corte implementado — 2026-05-30

El primer corte deja una base pura, testeable y desacoplada de UI/editor:

```text
src/lib/model/ids.ts
src/lib/model/project.ts
src/lib/model/storyWorld.ts
src/lib/model/scene.ts
src/lib/model/createInitialProject.ts
src/lib/storage/projectFileFormat.ts
src/lib/storage/projectValidation.ts
src/lib/storage/storageErrors.ts
src/lib/storage/migrations.ts
src/lib/storage/projectStorage.ts
```

Incluye:

- tipos mínimos para `StoryWorld`, `Work`, `Part`, `Chapter`, `Scene` y `KoheletProjectFile`;
- `app: 'kohelet'` y `schemaVersion: 1`;
- serialización JSON estable, formateada y legible;
- parseo desde texto crudo antes de validar;
- validación mínima de integridad del envelope, mundo narrativo, obras y escenas;
- validación de que cada `Scene.workId` coincida con la `Work` contenedora;
- validación de que `Scene.content` exista y sea serializable;
- errores tipados para `invalid_schema`, `unsupported_schema_version`, `read_failed` y `write_failed`;
- stub de migraciones que acepta versión 1 y rechaza versiones futuras;
- factory inicial con una escena vacía compatible con Sofer/Tiptap.

Block 10 agrega el boundary real de filesystem Tauri sin mezclarlo con React ni Sofer. `projectStorage.saveProjectFile` sigue aceptando un `ProjectFileWriter` inyectado, y `src/lib/storage/tauriProjectFileStorage.ts` lo adapta a comandos Tauri concretos para leer y escribir texto de proyecto.

## 6.1. Boundary Tauri implementado — 2026-05-31

Block 10 conecta el storage puro con el filesystem real de Tauri mediante una frontera explícita:

```text
src/lib/storage/tauriProjectFileStorage.ts
src-tauri/src/project_file_storage.rs
```

La API TypeScript expone:

```ts
openProjectFromPath(path: string)
saveProjectToPath(path: string, projectFile: KoheletProjectFile)
```

Reglas del boundary:

- no importa React;
- no conoce Sofer, Tiptap ni componentes;
- lee texto crudo con `read_project_file_text` y después delega parseo/migración/validación a `openProjectFromText`;
- valida y serializa con `saveProjectFile` antes de invocar `write_project_file_text`;
- permite inyectar un `TauriProjectFileInvoker` para tests unitarios sin tocar disco real ni UI.

Los comandos Rust quedan registrados en `src-tauri/src/lib.rs` y se mantienen pequeños:

- `read_project_file_text(path)` lee UTF-8 desde el path recibido;
- `write_project_file_text(path, contents)` escribe primero a un archivo temporal hermano, sincroniza el archivo y luego reemplaza/renombra hacia el destino final.

La escritura segura usa un temporal en el mismo directorio para que el reemplazo tenga la mejor semántica disponible por plataforma. Antes de reemplazar o mover un backup, el destino existente debe ser un archivo regular: directorios, symlinks y otros tipos no seguros se rechazan con `write_failed` y no se renombran ni se convierten en backups. Si el reemplazo directo no puede sobrescribir un archivo regular existente, se usa un backup temporal del archivo anterior y se intenta restaurarlo si falla el reemplazo final. Snapshots versionados y backups de usuario quedan para un bloque posterior.

Los errores de filesystem se mapean a errores tipados de dominio:

- `file_not_found`;
- `permission_denied`;
- `read_failed`;
- `write_failed`.

No se agregan permisos genéricos de filesystem ni plugins Tauri. El acceso a disco ocurre mediante comandos propios registrados explícitamente; cuando se agregue file picker o plugins de filesystem, sus capabilities deberán mantenerse mínimas y documentarse.

## 7. Autoguardado

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

## 8. Snapshots

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

## 9. Recovery

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

## 10. Escritura segura

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

## 11. Migraciones

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

## 12. Preferencias de UI

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

## 13. Errores de storage

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

---

## 12. Auditoría actual — 2026-05-30

Estado observado antes del primer corte de storage local seguro:

- Sofer existe como editor mínimo de escena mock en memoria. `EditorShell` monta Tiptap, toolbar, superficie editable y status bar.
- La serialización actual está limitada a helpers de editor: `emptyDoc`, `normalizeDoc` y `getEditorJson`. Esto confirma JSON estructurado, pero todavía no hay persistencia durable.
- El conteo de palabras existe para texto de la escena activa.
- No existen todavía tipos TypeScript implementados para `StoryWorld`, `Work`, `Part`, `Chapter`, `Scene` ni `KoheletProjectFile` bajo `src/lib/model/` o equivalente. El modelo vive documentado en `docs/data-model.md`.
- No existe todavía `src/lib/storage/`, ni `projectStorage`, ni autosave, snapshots, recovery, migraciones o comandos Tauri de filesystem.
- El status bar muestra un estado estático de guardado; no representa todavía estado real de persistencia.
- Tests relevantes actuales: render de app/workspace, serialización mínima del editor y conteo de palabras. No hay tests de storage ni validación de archivo de proyecto.

Conclusión: el próximo bloque debe ser pequeño, documentalmente alineado y centrado en crear una base durable para guardar un proyecto local sin mezclar storage con componentes React ni convertir `localStorage` en fuente del manuscrito.

---

## 13. Bloques de storage local

Objetivo del bloque:

```text
Crear la primera base de almacenamiento local de proyecto para que Kohelet pueda serializar y guardar un proyecto con escenas sin perder texto.
```

Este bloque debe preparar crear/abrir/guardar/autoguardar/snapshots/recovery, pero implementar solo el primer corte seguro: formato, validación mínima y guardado manual inicial.

### 13.1. Modelo mínimo de archivo local

Crear un contrato inicial de archivo versionado:

```ts
export type KoheletProjectFile = {
  app: 'kohelet';
  schemaVersion: 1;
  savedAt: ISODateString;
  storyWorld: StoryWorld;
};
```

Reglas del primer corte:

- Usar extensión `.kohelet`.
- Guardar JSON estructurado.
- Mantener `schemaVersion` en el envelope, aunque `ProjectSettings` también documente versión para preferencias del proyecto.
- Mantener `Scene.content` como `unknown` serializable compatible con JSON de Tiptap.
- No guardar un documento gigante: las escenas son unidades separadas dentro de `Work.scenes`.
- No agregar cloud sync, colaboración, IA ni exportación avanzada.

### 13.2. Tipos de dominio mínimos

Antes de storage real, el primer corte debe crear o consolidar tipos mínimos en una capa de modelo, por ejemplo:

```text
src/lib/model/ids.ts
src/lib/model/project.ts
src/lib/model/scene.ts
src/lib/model/storyWorld.ts
```

Alcance mínimo recomendado:

- `ID` e `ISODateString`.
- `StoryWorld`, `Work`, `Part`, `Chapter`, `Scene` según `docs/data-model.md`, permitiendo `Part` y `Chapter` opcionales.
- `Scene.content: unknown` para preservar JSON de Sofer.
- `SceneStatus`, `SceneType`, `StoryWorldType`, `WorkType` y `StructureMode`.
- Una factory de proyecto vacío o proyecto inicial con una escena vacía puede existir en dominio, no en UI.

### 13.3. Capa `projectStorage`

Crear una capa enfocada, sin UI:

```text
src/lib/storage/projectFileFormat.ts
src/lib/storage/projectValidation.ts
src/lib/storage/projectStorage.ts
src/lib/storage/storageErrors.ts
src/lib/storage/migrations.ts
```

Responsabilidades iniciales:

- `serializeProjectFile(projectFile): string`.
- `parseProjectFile(raw: string): unknown`.
- `validateProjectFile(input: unknown): KoheletProjectFile`.
- `saveProject(path, projectFile)` usando escritura segura.
- `openProject(path)` parseando, validando y migrando cuando corresponda.
- Errores tipados para `invalid_schema`, `unsupported_schema_version`, `read_failed` y `write_failed`.

La UI debe llamar a esta capa desde un boundary claro. Los componentes de editor no deben importar APIs de filesystem.

### 13.4. Boundary Tauri/filesystem

Para el primer corte, la implementación debe definir un límite explícito:

```text
React/UI → servicio TypeScript de storage → comando Tauri pequeño → filesystem
```

Requisitos del boundary:

- No usar `localStorage` como persistencia de manuscrito.
- Mantener permisos Tauri explícitos y documentados cuando se agreguen.
- Evitar lógica de rutas dentro de componentes React.
- Devolver errores claros al servicio TypeScript.
- No interceptar la X nativa de la ventana en este bloque.

### 13.5. Escritura segura para guardado manual

El guardado manual inicial debe seguir este patrón, o documentar una alternativa equivalente si Tauri limita algún paso:

1. Clonar/preparar payload desde el modelo de proyecto actual.
2. Normalizar contenido de escenas con helpers compatibles con Sofer cuando corresponda.
3. Validar `KoheletProjectFile`.
4. Serializar con JSON estable y `savedAt` actualizado.
5. Escribir a archivo temporal cercano al destino.
6. Reemplazar el archivo final mediante operación atómica o la alternativa más segura disponible.
7. Conservar el payload anterior o preparar snapshot antes de reemplazos riesgosos en cortes posteriores.
8. Reportar error sin marcar como guardado si falla cualquier paso.

### 13.6. Validaciones mínimas de integridad

El primer corte debe validar al menos:

- `app === 'kohelet'`.
- `schemaVersion === 1` o versión migrable explícitamente soportada.
- `savedAt` presente como string ISO.
- `storyWorld.id`, `storyWorld.title`, `storyWorld.type`, `storyWorld.settings`.
- `storyWorld.works` como arreglo no vacío para proyectos con manuscrito.
- Cada `Work.id`, `Work.storyWorldId`, `Work.title`, `Work.order`, `Work.structureMode`.
- Cada `Scene.id`, `Scene.workId`, `Scene.title`, `Scene.order`, `Scene.type`, `Scene.status`, `Scene.content`.
- `Scene.workId` coincide con la `Work` que contiene la escena, para evitar escenas bendecidas dentro de una obra equivocada.
- `Chapter.sceneIds` apunta a escenas existentes cuando haya capítulos.
- `Part.chapterIds` apunta a capítulos existentes cuando haya partes.
- El contenido de escena es serializable y, si tiene forma de Tiptap, no depende del DOM visible.

No se debe intentar reparar silenciosamente datos que puedan borrar texto. Las reparaciones destructivas requieren decisión documentada y tests.

### 13.7. Base para autosave, snapshots y recovery

Este bloque no debe implementar todavía el flujo completo, pero debe dejar puntos de extensión:

- `SaveState` real en storage/editor shell: `saved`, `dirty`, `saving`, `error`, `recovered`.
- API futura separada para `autosaveStorage.ts`, no mezclada con `projectStorage.ts`.
- API futura separada para `snapshotStorage.ts` con política de retención.
- API futura separada para `recoveryStorage.ts` que preserve payloads recuperables hasta resolución explícita.
- Tests futuros para detección de recovery y snapshots.

### 13.8. Tests mínimos del primer corte de implementación

Cuando se implemente el primer corte, agregar tests unitarios para:

- serializar un proyecto válido con una escena vacía de Sofer;
- abrir/validar un archivo `.kohelet` válido;
- rechazar `app` incorrecto;
- rechazar `schemaVersion` futuro no soportado;
- rechazar escena sin `content`;
- preservar `Scene.content` estructurado durante roundtrip;
- mapear errores de lectura/escritura a categorías tipadas.

Si se agregan comandos Tauri, sumar la validación de escritorio correspondiente cuando el entorno lo permita.

### 13.9. Fuera de alcance explícito del primer corte

No implementar en este bloque:

- sincronización cloud;
- colaboración multiusuario;
- IA;
- exportación RTF/DOCX/PDF;
- snapshots periódicos completos;
- recovery UI completo;
- migraciones reales más allá de rechazar versiones futuras o dejar stub explícito;
- adjuntos pesados;
- almacenamiento principal del manuscrito en `localStorage`;
- toolbar o funciones tipo Word no relacionadas con persistencia de escenas.
