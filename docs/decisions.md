# docs/decisions.md — Kohelet

> Registro de decisiones del proyecto.  
> Este archivo documenta decisiones estables, motivo, consecuencias y fecha aproximada.  
> No reemplaza `roadmap.md`, `project_requirements.md` ni `DESIGN.md`.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado del documento:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Cómo usar este archivo

Registrar una decisión cuando:

- cambia el alcance del producto,
- se define una tecnología principal,
- se descarta una alternativa importante,
- se modifica el modelo de datos,
- se cambia una regla visual o de UX,
- se introduce una restricción para Codex,
- se mueve una funcionalidad de 1.0 a post-1.0 o al revés.

Formato sugerido:

```md
## ADR-000 — Título de la decisión

**Fecha:** YYYY-MM-DD  
**Estado:** aceptada | propuesta | reemplazada | descartada  
**Documentos relacionados:** `archivo.md`, `otro.md`

### Contexto

### Decisión

### Motivo

### Consecuencias

### Seguimiento
```

---

## ADR-001 — Kohelet como app de escritorio para escritores

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `roadmap.md`, `project_requirements.md`, `DESIGN.md`

### Contexto

El proyecto necesita enfocarse en escritura narrativa de largo aliento y no convertirse en una app genérica de notas ni en un clon de Word.

### Decisión

Kohelet será una aplicación de escritorio para planificar, escribir, proteger, revisar y exportar obras narrativas.

### Motivo

Una app de escritorio permite priorizar foco, guardado local, recuperación, escritura prolongada y una experiencia más controlada para autores.

### Consecuencias

- El stack base será Tauri 2 + React + TypeScript + Vite.
- La experiencia será desktop-first.
- El guardado local y la recuperación tienen prioridad alta.
- No se diseñará como dashboard web ni como editor genérico de documentos.

### Seguimiento

- Validar build de escritorio antes de 1.0.
- Registrar criterios de release en `docs/release.md`.

---

## ADR-002 — Sofer como editor central de escritura

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/editor-core.md`

### Contexto

La app necesita un editor rich-text, pero no debe transformarse en una suite de oficina.

### Decisión

El módulo de escritura se llamará Sofer. Usará Tiptap como editor rich-text principal.

### Motivo

Tiptap permite trabajar con contenido estructurado, comandos desacoplados y serialización compatible con futuras exportaciones.

### Consecuencias

- El contenido del editor debe guardarse como JSON estructurado.
- El DOM visible no será fuente de verdad para exportar.
- La toolbar será acotada y desacoplada.
- El editor no debe desmontarse al abrir/cerrar paneles contextuales.

### Seguimiento

- Documentar extensiones iniciales en `docs/editor-core.md`.
- Crear tests para serialización básica.

---

## ADR-003 — Jerarquía narrativa máxima

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/data-model.md`

### Contexto

El proyecto debe soportar cuento corto, novela corta, novela, novela larga, trilogía, saga, serie y universo compartido.

### Decisión

La jerarquía máxima será:

```text
StoryWorld → Work → Part → Chapter → Scene
```

### Motivo

Esta estructura permite que una obra independiente y una saga compartan modelo sin duplicar personajes, lugares, tramas o documentación.

### Consecuencias

- `StoryWorld` será el contenedor superior.
- `Work` será una obra concreta.
- `Part` será opcional.
- `Chapter` será opcional según tipo de obra.
- `Scene` será la unidad principal y obligatoria de escritura.
- La documentación compartida vivirá en `StoryWorld`.

### Seguimiento

- Definir validaciones en `docs/data-model.md`.
- Confirmar cómo se serializa el proyecto local.

---

## ADR-004 — Escena como unidad principal de escritura

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/editor-core.md`, `docs/data-model.md`

### Contexto

Una novela completa como único documento gigante complica navegación, revisión, exportación, guardado parcial y planificación.

### Decisión

La escena será la unidad principal de escritura. Sofer editará escenas.

### Motivo

La escena conecta mejor la escritura con personajes, lugares, tramas, objetivos, notas y exportación ordenada.

### Consecuencias

- Cada escena tendrá contenido rich-text propio.
- La exportación compilará escenas en orden.
- Los módulos narrativos podrán vincularse a escenas.
- El panel contextual debe mostrar información de la escena activa.

### Seguimiento

- Definir campos mínimos de `Scene`.
- Crear filtros por tipo y estado de escena.

---

## ADR-005 — Soporte para sagas, trilogías y universos compartidos

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/data-model.md`

### Contexto

Un escritor puede estar creando una novela individual o una obra que forma parte de una saga más grande.

### Decisión

Kohelet debe permitir que un `StoryWorld` contenga una o varias `Work`.

### Motivo

Permite compartir personajes, lugares, líneas temporales, tramas, lore, notas y referencias entre libros.

### Consecuencias

- La documentación compartida no debe pertenecer únicamente a una novela.
- Los módulos como personajes y lugares deben poder relacionarse con múltiples obras.
- Una obra individual puede crearse dentro de un `StoryWorld` por defecto.

### Seguimiento

- Diseñar UI simple para que el usuario no sienta complejidad innecesaria cuando escribe una sola obra.

---

## ADR-006 — Núcleo narrativo como módulo core

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/data-model.md`

### Contexto

La premisa dramática y la premisa de autor funcionan como eje rector de una historia. No deberían quedar perdidas como notas genéricas.

### Decisión

Kohelet tendrá un módulo de Núcleo narrativo.

Campos previstos:

- premisa dramática,
- premisa de autor o tesis,
- pregunta central,
- tema principal,
- conflicto central,
- promesa narrativa,
- resolución esperada,
- logline.

### Motivo

Ayuda al escritor a decidir qué incluir, descartar o reforzar.

### Consecuencias

- Puede existir en `StoryWorld` y en `Work`.
- Debe poder aparecer en el panel contextual.
- Debe guiar revisión de escenas, pero no imponer una estructura rígida.

### Seguimiento

- Crear modelo `NarrativeCore`.
- Definir UI inicial mínima.

---

## ADR-007 — Tipos de escena como metadata narrativa

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/data-model.md`

### Contexto

Las escenas cumplen funciones narrativas diferentes y esa información ayuda a revisar ritmo, estructura y propósito.

### Decisión

Cada escena podrá tener un tipo narrativo.

Tipos iniciales:

- conflicto,
- revelación,
- decisión,
- tensión / suspenso,
- transición,
- reacción,
- libre / personalizado.

### Motivo

Permite filtros, badges, panel contextual y futuras estadísticas narrativas.

### Consecuencias

- El campo `scene.type` debe existir desde el modelo base.
- El análisis automático de ritmo queda post-1.0.
- El tipo libre permitirá etiquetas personalizadas.

### Seguimiento

- Definir traducciones en `es-AR.json`.
- Crear `SceneTypeBadge` cuando se implemente UI.

---

## ADR-008 — Panel contextual de escritura

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `DESIGN.md`, `project_requirements.md`, `docs/editor-core.md`

### Contexto

El escritor necesita consultar información de escena, capítulo, parte, obra o saga sin abandonar la escritura.

### Decisión

Kohelet tendrá dos modos principales:

```text
Modo concentración: editor amplio.
Modo contexto: editor reducido + panel contextual derecho.
```

### Motivo

Permite consultar apoyo narrativo de forma temporal y volver al foco de escritura.

### Consecuencias

- El panel contextual debe ser cerrable.
- El editor no debe desmontarse al abrir/cerrar el panel.
- Cursor y selección deben preservarse.
- El panel contextual no debe competir visualmente con el texto.

### Seguimiento

- Implementar layout con CSS Modules y tokens.
- Evaluar `react-resizable-panels`.

---

## ADR-009 — CSS Modules + tokens globales

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `DESIGN.md`, `project_requirements.md`, `.agents/skills/css-modules-ui/SKILL.md`

### Contexto

Se necesita evitar que estilos de un componente sobrescriban estilos de otro y mantener un sistema visual consistente.

### Decisión

Kohelet usará CSS Modules para estilos por componente y CSS global solo para tokens y estilos realmente globales.

Regla:

```text
ComponentName.tsx → ComponentName.module.css
ComponentName.jsx → ComponentName.module.css
```

Archivos globales permitidos:

```text
src/styles/tokens.css
src/styles/globals.css
```

### Motivo

Los CSS Modules evitan colisiones de clases. Los tokens permiten temas claro/oscuro y consistencia visual.

### Consecuencias

- No crear `.css` globales para componentes.
- No hardcodear colores cuando exista token.
- Los componentes deben consumir variables CSS.
- Las skills de UI deben reforzar esta regla.

### Seguimiento

- Crear `tokens.css` en fase foundation.
- Crear `globals.css` en fase foundation.

---

## ADR-010 — Soporte de modo claro, oscuro y system

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `DESIGN.md`, `project_requirements.md`

### Contexto

La escritura prolongada requiere buena legibilidad en diferentes condiciones de luz.

### Decisión

Kohelet soportará:

- modo claro,
- modo oscuro,
- preferencia del sistema.

### Motivo

Permite sesiones largas con menor fatiga visual y respeta preferencias del usuario.

### Consecuencias

- La implementación debe basarse en tokens CSS.
- Los componentes no deben depender de un único tema.
- El modo claro será cálido tipo papel.
- El modo oscuro será cálido tipo carbón/sepia.

### Seguimiento

- Definir `data-theme="light"`, `data-theme="dark"` y fallback por sistema.

---

## ADR-011 — i18n desde el inicio con español argentino

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/i18n.md`, `.agents/skills/i18n-ui/SKILL.md`

### Contexto

La app arranca en español argentino, pero debe poder sumar otros idiomas después.

### Decisión

Todo texto visible de UI debe salir de `src/i18n/locales/es-AR.json`.

### Motivo

Evita textos hardcodeados y facilita crecimiento futuro.

### Consecuencias

- No hardcodear textos visibles en componentes.
- Excepción: marcas como `Kohelet` y `Sofer`.
- Los tests o revisiones deben detectar textos visibles hardcodeados en componentes críticos.

### Seguimiento

- Crear guía en `docs/i18n.md`.
- Crear estructura inicial de claves.

---

## ADR-012 — Exportación RTF como prioridad 1.0

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/export.md`

### Contexto

La app debe permitir sacar el manuscrito de forma útil sin intentar resolver maquetación editorial avanzada al inicio.

### Decisión

La exportación principal para 1.0 será RTF.

### Motivo

RTF permite conservar estructura básica y es más alcanzable que DOCX/PDF avanzado para una primera versión estable.

### Consecuencias

- DOCX queda post-1.0 salvo aprobación explícita.
- PDF avanzado queda post-1.0 salvo aprobación explícita.
- La exportación debe compilar escenas en orden.

### Seguimiento

- Crear `compileManuscript.ts`.
- Crear `exportRtf.ts`.
- Crear tests de exportación.

---

## ADR-013 — Guardado local, snapshots y recuperación como prioridad

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `project_requirements.md`, `docs/storage.md`, `.agents/skills/tauri-storage/SKILL.md`

### Contexto

La peor falla para una app de escritura es perder texto.

### Decisión

Kohelet debe priorizar guardado local, autoguardado, snapshots y recuperación ante cierre inesperado.

### Motivo

La confianza del escritor depende de que el texto esté protegido.

### Consecuencias

- `localStorage` no será almacenamiento principal del manuscrito.
- Deben existir indicadores de guardado.
- La estructura debe poder migrarse.
- Storage no debe mezclarse con UI del editor.

### Seguimiento

- Definir formato local en `docs/storage.md`.
- Crear tests de integridad y recuperación.

---

## ADR-014 — Módulos post-1.0 fuera del alcance inicial

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `roadmap.md`, `project_requirements.md`, `docs/task.md`

### Contexto

El proyecto puede crecer mucho, pero 1.0 debe ser estable y alcanzable.

### Decisión

Quedan fuera de 1.0 salvo aprobación explícita:

- asistente IA,
- sincronización cloud,
- colaboración multiusuario,
- comentarios editoriales avanzados,
- control de cambios,
- exportación DOCX completa,
- exportación PDF avanzada,
- cronología avanzada,
- mapas visuales complejos,
- adjuntos pesados,
- análisis automático de ritmo,
- plantillas narrativas avanzadas.

### Motivo

Evita inflar el producto antes de estabilizar escritura, guardado y exportación.

### Consecuencias

- Codex no debe implementar estas features sin pedido explícito.
- Pueden mencionarse como futuras, pero no planificarse dentro del core 1.0.

### Seguimiento

- Revisar alcance al llegar a beta.

---

## ADR-015 — Skills locales para guiar Codex

**Fecha:** 2026-05-24  
**Estado:** aceptada  
**Documentos relacionados:** `AGENTS.md`, `.agents/skills/`, `docs/codex-workflow.md`

### Contexto

El proyecto necesita que Codex trabaje con reglas repetibles sin inflar `AGENTS.md`.

### Decisión

Se usarán skills locales en `.agents/skills/`.

Skills iniciales:

- `css-modules-ui`,
- `rich-text-editor`,
- `tauri-storage`,
- `i18n-ui`,
- `testing-react`,
- `docs-maintenance`.

### Motivo

Permite instrucciones especializadas por tipo de tarea.

### Consecuencias

- `AGENTS.md` debe indicar cuándo usar cada skill.
- Las tareas de UI deben usar `css-modules-ui`.
- Las tareas de editor deben usar `rich-text-editor`.
- Las tareas de storage deben usar `tauri-storage`.
- Las tareas de i18n deben usar `i18n-ui`.
- Las tareas de tests deben usar `testing-react`.
- Las tareas de documentación deben usar `docs-maintenance`.

### Seguimiento

- Mantener skills actualizadas cuando cambie la arquitectura.

---

## ADR — Dependency installation baseline

**Fecha:** 2026-05-29
**Estado:** aceptada
**Documentos relacionados:** `package.json`, `.npmrc`, `.github/workflows/ci.yml`, `docs/dependency-installation.md`, `docs/task.md`

### Contexto

PR #4 dejó el flujo web de GitHub Actions en verde con el primer editor mínimo Sofer cuando el repositorio todavía no tenía `pnpm-lock.yaml` y el entorno de Codex Cloud podía fallar al instalar dependencias con `ERR_PNPM_FETCH_403`. Después, `pnpm-lock.yaml` fue generado y mergeado en `main`, por lo que CI puede endurecerse con lockfile congelado.

### Decisión

- Use `pnpm@10.28.1` for the current baseline.
- Use Node 22 in GitHub Actions.
- Keep the npm public registry explicit through `.npmrc`.
- Do not use GitHub Packages or auth tokens unless private packages are introduced.
- Use `pnpm install --frozen-lockfile --reporter=append-only` in CI now that `pnpm-lock.yaml` is committed.
- Keep pnpm cache enabled in `actions/setup-node@v4` because the lockfile is stable.
- Treat Codex Cloud `ERR_PNPM_FETCH_403` as an environment/proxy limitation when GitHub Actions validates successfully.

### Motivo

La instalación debe ser reproducible y fácil de diagnosticar sin introducir credenciales innecesarias ni cambios de alcance. GitHub Actions ya validó la instalación, lint, tests y build web con Node 22, `pnpm@10.28.1` y el registro público de npm.

### Consecuencias

- CI usa `pnpm install --frozen-lockfile --reporter=append-only` siempre y falla si `package.json` y `pnpm-lock.yaml` divergen.
- `cache: pnpm` queda habilitado porque el lockfile ya está commiteado.
- Un 403 de Codex Cloud no debe resolverse cambiando features, Tiptap, Sofer, UI, storage, exportación o modelos narrativos.

### Seguimiento

- [x] `pnpm-lock.yaml` fue generado y mergeado en `main`.
- [x] CI quedó simplificado a `pnpm install --frozen-lockfile --reporter=append-only` y `actions/setup-node@v4` quedó con `cache: pnpm`.
- [x] El workflow manual `Generate pnpm lockfile` se mantiene como herramienta para regenerar el lockfile cuando cambien dependencias.
- [ ] Si se cambian dependencias, actualizar `package.json` y `pnpm-lock.yaml` de forma consistente; CI debe fallar cuando diverjan.

---

## ADR-016 — Primer corte de storage local seguro

**Fecha:** 2026-05-30
**Estado:** aceptada
**Documentos relacionados:** `docs/storage.md`, `docs/data-model.md`, `docs/editor-core.md`, `docs/task.md`

### Contexto

La instalación ya quedó solidificada con `pnpm-lock.yaml` y CI usa instalación con lockfile congelado. Sofer ya tiene un editor mínimo de escena en memoria con serialización JSON básica, pero todavía no existe persistencia durable, modelo implementado ni capa `src/lib/storage/`.

### Decisión

El próximo bloque funcional será un primer corte pequeño de storage local seguro:

- archivo local `.kohelet` en JSON estructurado;
- envelope `KoheletProjectFile` con `app: 'kohelet'`, `schemaVersion: 1`, `savedAt` y `storyWorld`;
- `Scene.content` como contenido estructurado serializable compatible con Sofer/Tiptap;
- capa `projectStorage` separada de React y del editor;
- guardado manual inicial con escritura segura;
- validación mínima de integridad antes de abrir o marcar como guardado;
- stubs o puntos de extensión para autosave, snapshots, recovery y migraciones futuras.

### Motivo

La prioridad máxima del producto es no perder texto. Antes de sumar más UI, módulos narrativos o exportación, Kohelet necesita una base durable y versionada para guardar escenas sin depender de memoria React ni de `localStorage`.

### Consecuencias

- `localStorage` queda limitado a preferencias de UI o datos pequeños documentados, nunca al manuscrito principal.
- Los componentes React no deben escribir archivos directamente ni contener lógica de rutas.
- Sofer no debe conocer detalles de filesystem.
- Cloud sync, colaboración, IA, snapshots completos, recovery UI completo y exportación quedan fuera del primer corte.
- La próxima PR debe incluir tests de validación/roundtrip y actualizar `docs/phases/phase-05-storage-recovery.md` si implementa parte de la fase.

### Seguimiento

- [ ] Implementar tipos mínimos de dominio y `KoheletProjectFile`.
- [ ] Implementar `src/lib/storage/projectStorage.ts` y módulos auxiliares.
- [ ] Implementar guardado manual inicial mediante boundary Tauri seguro.
- [ ] Agregar tests de validación, serialización y errores tipados.

---

## ADR-017 — Tauri project file boundary

**Fecha:** 2026-05-31
**Estado:** aceptada
**Documentos relacionados:** `docs/storage.md`, `docs/phases/phase-05-storage-recovery.md`, `src/lib/storage/tauriProjectFileStorage.ts`, `src-tauri/src/project_file_storage.rs`

### Contexto

La primera capa de storage ya serializa, valida y abre proyectos `.kohelet` desde texto crudo, pero faltaba conectar esa lógica pura con el filesystem real de Tauri sin ensuciar React ni el editor Sofer.

### Decisión

Se agrega un boundary explícito en dos niveles:

- TypeScript: `tauriProjectFileStorage` expone `openProjectFromPath` y `saveProjectToPath`, invoca comandos Tauri y delega parseo/validación/serialización a `projectStorage`.
- Rust/Tauri: `project_file_storage` registra comandos propios para leer texto y escribir texto con archivo temporal, sincronización y reemplazo/rename hacia el destino final.

No se agregan plugins ni permisos genéricos de filesystem en este bloque. Los errores reales se traducen a categorías de storage de dominio como `file_not_found`, `permission_denied`, `read_failed` y `write_failed`.

### Motivo

La prioridad es proteger el texto del escritor. Mantener el filesystem detrás de comandos pequeños permite testear la lógica de storage sin UI, evita que Sofer conozca rutas o APIs Tauri, y reduce el riesgo de marcar como guardado un proyecto inválido.

### Consecuencias

- La UI futura de abrir/guardar debe usar el boundary y no llamar comandos Tauri directamente desde componentes.
- Autosave, snapshots y recovery deben implementarse como módulos separados, no dentro de `tauriProjectFileStorage`.
- Si se agregan file picker o plugins de filesystem, sus capabilities deberán ser mínimas y documentadas.
- La escritura segura actual no reemplaza snapshots versionados; esos siguen pendientes para un bloque posterior.
- El destino de guardado existente debe ser un archivo regular; directorios, symlinks y otros tipos no seguros se rechazan como `write_failed` antes de mover backups o reemplazar paths.

### Seguimiento

- [x] Implementar comandos Tauri de lectura/escritura.
- [x] Implementar boundary TypeScript testeable.
- [x] Corregir validación de `Scene.workId` contra su `Work` contenedora.
- [ ] Implementar UI final de abrir/guardar.
- [ ] Implementar snapshots antes de flujos destructivos o migraciones riesgosas.
