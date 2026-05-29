# docs/index.md — Kohelet

> Mapa de documentación del proyecto.  
> Usar este archivo como punto de entrada rápido para humanos, Codex Cloud y Codex local.

**Proyecto:** Kohelet  
**Editor / módulo de escritura:** Sofer  
**Tipo:** aplicación de escritorio para escritores  
**Stack base:** Tauri 2 + React + TypeScript + Vite + pnpm + Tiptap  
**Idioma inicial:** Español argentino (`es-AR`)

---

## 1. Propósito de este índice

Este archivo explica qué documento debe leerse según el tipo de tarea.

Codex debe usarlo para ubicarse rápidamente antes de modificar código, documentación, diseño, storage, editor, exportación, i18n o tests.

Regla general:

```text
Primero entender el contexto.
Después tocar archivos.
Después actualizar documentación si la tarea cambia decisiones, alcance o fases.
```

---

## 2. Documentos raíz

Estos documentos viven en la raíz del repositorio.

```text
AGENTS.md
DESIGN.md
README.md
roadmap.md
project_requirements.md
```

### `AGENTS.md`

Define cómo deben trabajar Codex y los agentes sobre el repo.

Leer cuando la tarea implique:

- planificación de trabajo;
- ejecución con Codex;
- validaciones;
- uso de skills;
- límites de edición;
- reglas generales del proyecto.

No debe contener todo el detalle técnico. Para eso existen los documentos de `docs/`.

### `DESIGN.md`

Define el sistema visual, UX, layout y comportamiento de interfaz.

Leer cuando la tarea implique:

- UI;
- CSS Modules;
- tokens;
- modo claro/oscuro;
- layout de escritura;
- panel contextual;
- árbol narrativo;
- componentes visuales;
- estados de foco, error, vacío o disabled.

### `roadmap.md`

Define la dirección del producto.

Leer cuando la tarea implique:

- alcance;
- fases;
- módulos 1.0;
- módulos post-1.0;
- prioridades de producto;
- decisiones sobre qué construir o aplazar.

### `project_requirements.md`

Define el contrato técnico estable.

Leer cuando la tarea implique:

- arquitectura;
- stack;
- modelo de datos;
- Tauri;
- Tiptap;
- storage;
- exportación;
- i18n;
- testing;
- reglas técnicas para Codex.

### `README.md`

Documento público del proyecto.

Leer o actualizar cuando la tarea implique:

- presentación general;
- instalación;
- scripts;
- capturas;
- uso básico;
- estado del proyecto.

---

## 3. Documentos operativos principales

Estos documentos viven en `docs/`.

```text
docs/index.md
docs/task.md
docs/decisions.md
docs/codex-workflow.md
```

### `docs/index.md`

Mapa de documentación.

Debe mantenerse actualizado cuando se agregue, renombre o quite documentación importante.

### `docs/task.md`

Checklist vivo del proyecto.

Usar para:

- registrar avance por fases;
- marcar tareas completadas;
- dejar próximos pasos;
- resumir validaciones;
- evitar perder contexto entre sesiones.

No debe transformarse en un documento gigante de diseño. Para detalles técnicos, usar documentos específicos.

### `docs/decisions.md`

Registro de decisiones del proyecto.

Actualizar cuando se tome una decisión relevante como:

- elegir una tecnología;
- cambiar modelo de datos;
- aplazar un módulo;
- cambiar comportamiento de storage;
- modificar alcance de 1.0;
- adoptar un patrón técnico.

Formato recomendado:

```md
## YYYY-MM-DD — Título de la decisión

**Estado:** Aceptada / Pendiente / Revertida

### Contexto

### Decisión

### Consecuencias
```

### `docs/codex-workflow.md`

Guía operativa para Codex Cloud / Codex local.

Leer cuando la tarea implique:

- planificar un bloque;
- usar skills;
- tocar varias capas;
- actualizar documentación;
- cerrar una fase;
- validar build/lint/test.

---

## 4. Documentos técnicos por área

```text
docs/architecture.md
docs/data-model.md
docs/editor-core.md
docs/storage.md
docs/export.md
docs/i18n.md
docs/testing.md
docs/dependency-installation.md
docs/release.md
docs/glossary.md
```

### `docs/architecture.md`

Explica cómo se organiza la app por capas y carpetas.

Leer cuando la tarea implique:

- estructura de carpetas;
- separación de responsabilidades;
- ubicación de componentes;
- servicios;
- librerías internas;
- límites entre UI, dominio, storage y exportación.

### `docs/data-model.md`

Define entidades, tipos y reglas del dominio narrativo.

Leer cuando la tarea implique:

- `StoryWorld`;
- `Work`;
- `Part`;
- `Chapter`;
- `Scene`;
- `NarrativeCore`;
- personajes;
- lugares;
- tramas;
- notas;
- referencias;
- continuidad;
- tipos de escena;
- migraciones de modelo.

Jerarquía base:

```text
StoryWorld → Work → Part → Chapter → Scene
```

### `docs/editor-core.md`

Define el editor Sofer.

Leer cuando la tarea implique:

- Tiptap;
- toolbar;
- comandos;
- serialización;
- contenido rich-text;
- atajos;
- modo concentración;
- modo contexto;
- separación entre editor y paneles.

### `docs/storage.md`

Define guardado local, autoguardado, snapshots, recuperación y migraciones.

Leer cuando la tarea implique:

- abrir proyecto;
- guardar proyecto;
- guardar como;
- autoguardado;
- snapshots;
- recuperación;
- integridad del archivo;
- migraciones;
- prevención de pérdida de texto.

### `docs/export.md`

Define exportación de manuscritos.

Leer cuando la tarea implique:

- RTF;
- TXT;
- compilación de escenas;
- exportar obra completa;
- exportar parte;
- exportar capítulo;
- exportar escena;
- perfiles futuros de exportación.

### `docs/i18n.md`

Define reglas de internacionalización.

Leer cuando la tarea implique:

- textos visibles;
- `src/i18n/locales/es-AR.json`;
- labels;
- botones;
- mensajes de error;
- textos de estados;
- evitar hardcodeo.

Regla fuerte:

```text
Todo texto visible debe salir de i18n, salvo nombres de marca como Kohelet y Sofer.
```

### `docs/testing.md`

Define estrategia de validación.

Leer cuando la tarea implique:

- Vitest;
- React Testing Library;
- tests de modelos;
- tests de editor;
- tests de storage;
- tests de exportación;
- smoke tests;
- validaciones de i18n.

### `docs/dependency-installation.md`

Registra cómo diagnosticar instalación de dependencias, registry npm/pnpm, proxy/auth y validaciones de CI.

Leer cuando la tarea implique:

- `pnpm install`;
- errores `ERR_PNPM_FETCH_403`;
- configuración `.npmrc`;
- workflows de CI para lint/test/build.

### `docs/release.md`

Define criterios de release.

Leer cuando la tarea implique:

- versión;
- checklist pre-release;
- build de escritorio;
- validación Windows;
- release notes;
- criterios para 1.0.

### `docs/glossary.md`

Define términos del proyecto.

Leer cuando haya dudas sobre:

- nombres internos;
- nombres visibles;
- entidades del modelo;
- términos narrativos;
- diferencia entre módulo, obra, mundo narrativo, escena, parte, capítulo, etc.

---

## 5. Patrones técnicos transferidos

Estos documentos documentan patrones aprendidos en otros proyectos y aplicables a Kohelet.

```text
docs/patron_cierre_nativo_y_recuperacion_borrador.md
```

### `docs/patron_cierre_nativo_y_recuperacion_borrador.md`

Patrón obligatorio de referencia para cierre de ventana, borrador local y recuperación.

Leer cuando la tarea implique:

- cierre de ventana;
- botón X de Windows;
- Tauri window close;
- prevención de pérdida de texto;
- borrador local;
- recuperación al iniciar;
- modal de cambios pendientes;
- acciones Nuevo / Abrir;
- evitar stale drafts.

Regla principal:

```text
No interceptar la X nativa de la ventana salvo necesidad extrema.
Cerrar debe quedar en manos de Tauri/Windows.
La protección del texto debe resolverse con borrador local recuperable.
```

Este patrón existe para evitar repetir errores donde una app de escritorio dejó de cerrar correctamente por interceptar el cierre nativo.

Resumen del enfoque:

```text
Cerrar ventana:
  cierre nativo de Tauri/Windows

Cambios pendientes al cerrar:
  borrador local + recuperación al iniciar

Nuevo / Abrir con cambios:
  modal Guardar / Descartar / Cancelar

Persistencia:
  debounce + flush final no bloqueante

Limpieza:
  storage + timer + snapshot en memoria
```

---

## 6. Fases del proyecto

Los documentos de fase viven en:

```text
docs/phases/
```

Estructura sugerida:

```text
docs/phases/
  phase-00-repository-setup.md
  phase-01-foundation.md
  phase-02-editor-core.md
  phase-03-narrative-structure.md
  phase-04-writing-modules.md
  phase-05-storage-recovery.md
  phase-06-export.md
  phase-07-polish-release.md
```

### Uso de `docs/phases/*`

Cada archivo debe registrar:

- objetivo de la fase;
- alcance;
- fuera de alcance;
- archivos tocados;
- implementación realizada;
- validaciones;
- bugs encontrados;
- decisiones tomadas;
- pendientes.

No reemplaza `docs/task.md`.  
`docs/task.md` resume avance.  
`docs/phases/*` guarda el detalle histórico.

---

## 7. Skills locales de Codex

Las skills viven en:

```text
.agents/skills/
```

Skills iniciales:

```text
.agents/skills/css-modules-ui/SKILL.md
.agents/skills/rich-text-editor/SKILL.md
.agents/skills/tauri-storage/SKILL.md
.agents/skills/i18n-ui/SKILL.md
.agents/skills/testing-react/SKILL.md
.agents/skills/docs-maintenance/SKILL.md
```

### Cuándo usar cada skill

#### `css-modules-ui`

Usar cuando la tarea toque:

- componentes React;
- CSS Modules;
- `ComponentName.module.css`;
- tokens;
- layout;
- estados visuales;
- modo claro/oscuro;
- accesibilidad visual.

#### `rich-text-editor`

Usar cuando la tarea toque:

- Sofer;
- Tiptap;
- toolbar;
- comandos del editor;
- serialización;
- contenido por escena;
- atajos;
- selección/cursor.

#### `tauri-storage`

Usar cuando la tarea toque:

- filesystem;
- abrir/guardar proyecto;
- snapshots;
- autoguardado;
- recuperación;
- formato local;
- migraciones;
- cierre de ventana y borrador local.

También debe considerar `docs/patron_cierre_nativo_y_recuperacion_borrador.md`.

#### `i18n-ui`

Usar cuando la tarea toque:

- textos visibles;
- labels;
- botones;
- mensajes;
- placeholders;
- `src/i18n/locales/es-AR.json`.

#### `testing-react`

Usar cuando la tarea toque:

- Vitest;
- React Testing Library;
- smoke tests;
- tests de componentes;
- tests de modelos;
- tests de editor/storage/export.

#### `docs-maintenance`

Usar cuando la tarea toque:

- documentación;
- cierre de fase;
- actualización de checklist;
- registro de decisiones;
- resumen de implementación.

---

## 8. Orden de lectura recomendado para Codex

### Tarea de UI / CSS

```text
1. AGENTS.md
2. DESIGN.md
3. project_requirements.md
4. docs/index.md
5. docs/architecture.md
6. skill: css-modules-ui
```

### Tarea de editor Sofer

```text
1. AGENTS.md
2. project_requirements.md
3. docs/index.md
4. docs/editor-core.md
5. docs/data-model.md
6. skill: rich-text-editor
```

### Tarea de storage / recuperación

```text
1. AGENTS.md
2. project_requirements.md
3. docs/index.md
4. docs/storage.md
5. docs/patron_cierre_nativo_y_recuperacion_borrador.md
6. skill: tauri-storage
```

### Tarea de i18n

```text
1. AGENTS.md
2. project_requirements.md
3. docs/index.md
4. docs/i18n.md
5. skill: i18n-ui
```

### Tarea de tests

```text
1. AGENTS.md
2. docs/index.md
3. docs/testing.md
4. documento del área que se está testeando
5. skill: testing-react
```

### Tarea de documentación

```text
1. AGENTS.md
2. docs/index.md
3. docs/codex-workflow.md
4. docs/task.md
5. docs/decisions.md
6. skill: docs-maintenance
```

---

## 9. Reglas de actualización documental

Actualizar documentación cuando:

- se agregue un módulo;
- se aplace un módulo;
- cambie el modelo de datos;
- cambie el comportamiento de storage;
- cambie la estrategia de exportación;
- se modifique el layout principal;
- se agregue una regla de i18n;
- se tome una decisión técnica relevante;
- se cierre una fase.

Dónde actualizar:

```text
Cambio de alcance:
  roadmap.md
  project_requirements.md
  docs/task.md

Cambio técnico:
  project_requirements.md
  docs/<área>.md
  docs/decisions.md

Cambio visual:
  DESIGN.md
  docs/architecture.md si afecta estructura

Cambio de storage:
  docs/storage.md
  docs/patron_cierre_nativo_y_recuperacion_borrador.md si aplica
  docs/decisions.md

Cierre de fase:
  docs/task.md
  docs/phases/<fase>.md
```

---

## 10. Anti-patrones globales

Codex no debe:

- convertir Kohelet en un clon de Word;
- convertir Kohelet en una app genérica de notas;
- convertir Kohelet en un dashboard corporativo;
- hardcodear textos visibles;
- hardcodear colores fuera de tokens;
- crear CSS global para componentes;
- romper CSS Modules;
- guardar manuscritos solo en `localStorage`;
- interceptar la X nativa de Windows sin aprobación explícita;
- mezclar editor, storage, exportación y UI en un componente gigante;
- agregar módulos post-1.0 sin aprobación;
- modificar muchos documentos sin dejar claro por qué.

---

## 11. Estado inicial esperado del repo

Al comenzar el proyecto, la documentación mínima debería incluir:

```text
AGENTS.md
DESIGN.md
README.md
roadmap.md
project_requirements.md
docs/index.md
docs/task.md
docs/decisions.md
docs/codex-workflow.md
docs/architecture.md
docs/data-model.md
docs/editor-core.md
docs/storage.md
docs/export.md
docs/i18n.md
docs/testing.md
docs/release.md
docs/glossary.md
docs/patron_cierre_nativo_y_recuperacion_borrador.md
.agents/skills/*
```

---

## 12. Regla final

Antes de modificar el proyecto, Codex debe poder responder:

```text
¿Qué documento define el alcance?
¿Qué documento define la técnica?
¿Qué documento define el diseño?
¿Qué skill aplica?
¿Qué checklist debe actualizarse?
```

Si no puede responder eso, debe leer `docs/index.md` antes de continuar.
