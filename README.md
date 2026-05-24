# Kohelet

Kohelet es una aplicación de escritorio para escritores, pensada para planificar, escribir, proteger, revisar y exportar obras narrativas.

El objetivo no es crear un clon de Word ni una simple app de notas. Kohelet organiza el proceso de escritura alrededor de mundos narrativos, obras, partes, capítulos y escenas.

```text
StoryWorld → Work → Part → Chapter → Scene
```

El editor de escritura se llama **Sofer** y trabaja escena por escena.

---

## Estado del proyecto

Proyecto en etapa inicial.

Este repositorio comienza con documentación base, decisiones de arquitectura, diseño, flujo para Codex y skills de trabajo para acelerar la implementación.

La app está planificada para construirse con:

```text
Tauri 2 + React + TypeScript + Vite + pnpm + Tiptap
```

Plataforma objetivo inicial:

```text
Windows estable para 1.0.0
```

---

## Visión

Kohelet acompaña el proceso real de escritura narrativa:

1. crear un mundo narrativo o proyecto independiente;
2. crear una obra, cuento, novela, trilogía, saga o universo compartido;
3. planificar partes, capítulos y escenas;
4. definir núcleo narrativo, premisa, tesis y conflicto central;
5. escribir escenas con foco;
6. consultar contexto narrativo cuando sea necesario;
7. proteger el texto con guardado, autoguardado, snapshots y recuperación;
8. exportar el manuscrito.

La prioridad absoluta es no perder texto.

---

## Conceptos principales

### StoryWorld / Mundo narrativo

Contenedor superior del proyecto. Puede representar una obra independiente, trilogía, saga, serie, antología o universo compartido.

La documentación compartida vive en este nivel: personajes, lugares, tramas globales, notas, referencias y continuidad.

### Work / Obra

Manuscrito concreto dentro de un mundo narrativo. Puede ser un cuento corto, novela corta, novela ligera, novela, novela larga o volumen de saga.

### Part / Parte

División mayor dentro de una obra. Es opcional.

### Chapter / Capítulo

Agrupa escenas. Es opcional según el tipo de obra.

### Scene / Escena

Unidad principal de escritura. Cada escena puede tener contenido, tipo narrativo, estado, objetivo, conflicto, resultado, POV, lugar, personajes vinculados y notas.

### Narrative Core / Núcleo narrativo

Módulo para registrar premisa dramática, premisa de autor, pregunta central, tema, conflicto central, promesa narrativa y dirección de resolución.

---

## Módulos previstos para 1.0

Core obligatorio:

- mundo narrativo / StoryWorld;
- obra / Work;
- partes, capítulos y escenas;
- núcleo narrativo;
- editor Sofer;
- panel contextual de escritura;
- guardado, autoguardado, snapshots y recuperación;
- personajes;
- lugares;
- trama y subtramas;
- notas vinculadas;
- exportación RTF.

Recomendable si no compromete estabilidad:

- referencias simples;
- objetivos de palabras;
- revisión básica por estado;
- continuidad básica;
- filtros por tipo/estado de escena.

Post-1.0:

- cronología avanzada;
- glosario/lore avanzado;
- mapa de relaciones;
- exportación DOCX/PDF avanzada;
- asistente IA;
- colaboración;
- análisis automático de ritmo.

---

## Stack planificado

```text
Tauri 2
React
TypeScript
Vite
pnpm
Tiptap
lucide-react
react-resizable-panels
CSS Modules
Vitest
React Testing Library
GitHub Actions
```

---

## Documentación del repo

Documentos raíz:

```text
AGENTS.md
DESIGN.md
README.md
roadmap.md
project_requirements.md
```

Documentos en `docs/`:

```text
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
docs/phases/
```

`docs/index.md` es el mapa rápido para saber qué leer según la tarea.

---

## Codex y skills

El proyecto usa skills repo-scope para ayudar a Codex a trabajar con menos ambigüedad.

Ruta esperada:

```text
.agents/skills/
```

Skills previstas:

- `css-modules-ui`: componentes React, CSS Modules, tokens, layout, estados visuales y light/dark mode.
- `rich-text-editor`: Tiptap, Sofer, toolbar, comandos y serialización.
- `tauri-storage`: guardado local, snapshots, recovery, filesystem y migraciones.
- `i18n-ui`: textos visibles, claves i18n y `es-AR.json`.
- `testing-react`: Vitest, React Testing Library y smoke tests.
- `docs-maintenance`: actualización de documentación viva.

Antes de usar Codex sobre el repo, revisar:

```text
AGENTS.md
docs/index.md
docs/codex-workflow.md
```

---

## Estrategia CSS

Kohelet usa CSS Modules para estilos por componente.

```text
ComponentName.tsx → ComponentName.module.css
```

CSS global permitido:

```text
src/styles/tokens.css
src/styles/globals.css
```

Los componentes deben consumir tokens CSS y no hardcodear colores cuando exista una variable de diseño.

La app debe soportar:

```text
light
dark
system
```

---

## i18n

Idioma inicial:

```text
es-AR
```

Todo texto visible de UI debe salir de:

```text
src/i18n/locales/es-AR.json
```

Excepciones permitidas:

```text
Kohelet
Sofer
```

---

## Guardado y recuperación

La app debe priorizar la protección del texto.

Principios:

- no interceptar la X nativa de la ventana salvo necesidad extrema;
- usar cierre nativo de Tauri/Windows;
- proteger cambios con borrador local, autoguardado, snapshots y recuperación;
- mostrar confirmación para acciones internas destructivas como `Nuevo` o `Abrir`;
- evitar drafts obsoletos después de guardar o descartar.

Ver:

```text
docs/storage.md
docs/patron_cierre_nativo_y_recuperacion_borrador.md
```

---

## Instalación inicial

Cuando el proyecto Tauri/React esté inicializado:

```bash
pnpm install
```

Desarrollo:

```bash
pnpm run dev
```

Tests:

```bash
pnpm run test
```

Build:

```bash
pnpm run build
```

Los scripts exactos pueden ajustarse cuando se genere la base Tauri + Vite.

---

## Estructura esperada inicial

```text
kohelet/
├── AGENTS.md
├── DESIGN.md
├── README.md
├── roadmap.md
├── project_requirements.md
├── .agents/
│   └── skills/
└── docs/
    ├── index.md
    ├── task.md
    ├── decisions.md
    ├── codex-workflow.md
    ├── architecture.md
    ├── data-model.md
    ├── editor-core.md
    ├── storage.md
    ├── export.md
    ├── i18n.md
    ├── testing.md
    ├── release.md
    ├── glossary.md
    ├── patron_cierre_nativo_y_recuperacion_borrador.md
    └── phases/
```

---

## Desarrollo con Codex

Para tareas de UI, indicar skills explícitas cuando ayude:

```text
Use the css-modules-ui and i18n-ui skills.
```

Para tareas de editor:

```text
Use the rich-text-editor skill.
```

Para tareas de guardado o recuperación:

```text
Use the tauri-storage skill.
```

Para documentación:

```text
Use the docs-maintenance skill.
```

---

## License

Kohelet is source-available for personal, private, non-commercial use.

You may view, clone, download, run, study, and privately modify the project. You may not sell, redistribute, sublicense, repackage, commercialize, or use it as the basis for a paid product, SaaS, template, starter kit, course material, client deliverable, or competing commercial application without prior written permission.

See [LICENSE](./LICENSE) for the full terms.

## Estado esperado de 1.0

Kohelet 1.0 será exitoso si permite:

- crear un mundo narrativo o proyecto independiente;
- crear una obra dentro de ese mundo;
- organizar partes, capítulos y escenas;
- definir el núcleo narrativo;
- escribir escenas con Sofer;
- consultar contexto narrativo lateral;
- crear personajes, lugares, tramas y notas vinculadas;
- guardar y recuperar el proyecto de forma segura;
- exportar el manuscrito a RTF.
