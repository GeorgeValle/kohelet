# project_requirements.md — Kohelet

> Documento técnico base para Codex Cloud y agentes de desarrollo.  
> Este archivo concentra tecnologías, arquitectura, modelo de datos, módulos 1.0, reglas de implementación y restricciones estables para que `AGENTS.md` pueda quedar más liviano y orientado a roles, flujo de trabajo y validación.

**Proyecto:** Kohelet  
**Editor / módulo de escritura:** Sofer  
**Tipo:** Aplicación de escritorio para escritores  
**Stack base:** Tauri 2 + React + TypeScript + Vite + pnpm + Tiptap  
**Idioma inicial:** Español argentino (`es-AR`)  
**Última revisión:** 2026-05-23

---

## 1. Relación con otros documentos

Este documento deriva del `roadmap.md` y traduce sus decisiones de producto en requisitos técnicos, arquitectura, stack y reglas de implementación.

Si hay conflicto entre documentos:

1. `roadmap.md` define la dirección de producto.
2. `project_requirements.md` define la forma técnica de construirlo.
3. `DESIGN.md` define UX, layout, sistema visual y comportamiento de interfaz.
4. `AGENTS.md` define cómo deben trabajar Codex y los agentes sobre el repositorio.
5. `docs/task.md` refleja el avance vivo, pero no reemplaza el alcance estratégico.

---

## 2. Propósito técnico del proyecto

Kohelet es una app de escritorio para planificar, escribir, proteger, revisar y exportar obras narrativas.

No debe implementarse como un clon de Word ni como una simple hoja en blanco. La app debe organizar el flujo alrededor de:

```text
Mundo narrativo → Obra → Parte → Capítulo → Escena
```

La escena es la unidad principal de escritura. El editor Sofer edita escenas, no un documento gigante completo.

---

## 3. Nombres del producto y módulos

Nombres definidos:

```text
App / proyecto: Kohelet
Módulo de planificación / producto: Kohelet
Editor / módulo de escritura: Sofer
```

Reglas:

- `Kohelet` y `Sofer` son nombres de marca y pueden quedar como literales.
- Todo texto visible de UI debe salir de `src/i18n/locales/es-AR.json` mediante claves i18n.
- No hardcodear textos visibles en componentes.
- La arquitectura debe quedar preparada para sumar otros idiomas después de 1.0.

---

## 4. Stack técnico base

Stack obligatorio/recomendado:

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

### 4.1. Tauri 2

Usar Tauri como base de aplicación de escritorio.

Objetivo inicial:

```text
Windows estable como plataforma principal para 1.0.0
```

Reglas:

- Usar Tauri 2.
- Mantener configuración explícita de permisos, iconos y build.
- No asumir que un build web equivale a una app de escritorio validada.
- Validar build Windows antes de release.

### 4.2. React + TypeScript

Reglas:

- Componentes pequeños y con responsabilidad clara.
- No mezclar editor, toolbar, storage, exportación y módulos narrativos en un único componente.
- Modelos de dominio tipados desde el inicio.
- Evitar `any`.
- Usar `unknown` para contenido rich-text serializado cuando corresponda.

### 4.3. Vite + pnpm

Reglas:

- Usar `pnpm`, no `npm` ni `yarn`.
- Mantener scripts claros para dev, build, lint y test.
- En WSL, validar que `node` y `pnpm` resuelvan desde Linux/nvm y no desde `/mnt/c`.

### 4.4. Tiptap

Tiptap será el editor rich-text principal.

Reglas:

- Guardar contenido como JSON estructurado.
- No usar el DOM visible como fuente de verdad para exportación.
- La exportación debe convertir el modelo/editor JSON al formato final.
- El editor no debe desmontarse al abrir/cerrar paneles contextuales.

---

## 5. Arquitectura de carpetas sugerida

Estructura inicial recomendada:

```text
src/
  app/
    App.tsx
    AppRoutes.tsx
    providers/

  components/
    editor/
      RichTextEditor.tsx
      RichTextToolbar.tsx
      EditorShell.tsx
      EditorStatusBar.tsx
      RichTextEditor.module.css
      RichTextToolbar.module.css
    layout/
      AppChrome.tsx
      WritingWorkspace.tsx
      ContextualLayout.tsx
      WritingWorkspace.module.css
    project/
      StoryWorldTree.tsx
      WorkItem.tsx
      PartItem.tsx
      ChapterItem.tsx
      SceneItem.tsx
    contextual/
      ContextPanel.tsx
      SceneContextPanel.tsx
      WorkContextPanel.tsx
      StoryWorldContextPanel.tsx
    modules/
      NarrativeCorePanel.tsx
      CharactersPanel.tsx
      PlacesPanel.tsx
      PlotPanel.tsx
      ReferencesPanel.tsx
      NotesPanel.tsx
      GoalsPanel.tsx
      ReviewPanel.tsx
    modals/
      ConfirmDeleteDialog.tsx
      ExportDialog.tsx
      RecoveryDialog.tsx
    common/

  i18n/
    locales/
      es-AR.json
    i18n.ts

  lib/
    editor/
      editorExtensions.ts
      editorCommands.ts
      editorSerialization.ts
      editorShortcuts.ts
    model/
      ids.ts
      storyWorldModel.ts
      workModel.ts
      partModel.ts
      chapterModel.ts
      sceneModel.ts
      narrativeCoreModel.ts
      moduleModels.ts
      validation.ts
    storage/
      projectStorage.ts
      autosaveStorage.ts
      snapshotStorage.ts
      recoveryStorage.ts
      migrations.ts
    export/
      compileManuscript.ts
      exportRtf.ts
      exportPlainText.ts
    writing/
      wordCount.ts
      sceneStatus.ts
      sceneTypes.ts
      goals.ts
    modules/
      sideModules.ts
      moduleLinks.ts

  styles/
    tokens.css
    globals.css

src-tauri/
docs/
  index.md
  task.md
  decisions.md
  phases/
```

---

## 6. Documentación esperada del repositorio

Raíz:

```text
AGENTS.md
DESIGN.md
project_requirements.md
README.md
```

Carpeta `docs/`:

```text
docs/index.md
docs/task.md
docs/decisions.md
docs/architecture.md
docs/codex-workflow.md
docs/data-model.md
docs/editor-core.md
docs/export.md
docs/glossary.md
docs/i18n.md
docs/release.md
docs/storage.md
docs/testing.md
docs/phases/
```

Roles:

```text
AGENTS.md
→ Roles, reglas de trabajo, validaciones y límites para Codex/agentes.

DESIGN.md
→ Sistema visual, layout, UX, comportamiento de paneles y tono de interfaz.

project_requirements.md
→ Contrato técnico estable de la app.

docs/index.md
→ Mapa de documentación.

docs/task.md
→ Checklist vivo de avance.

docs/decisions.md
→ Decisiones tomadas y motivo.

docs/phases/*
→ Qué se implementó en cada fase.
```

---

## 7. Modelo de datos base

El modelo debe soportar obras simples y proyectos mayores.

Jerarquía máxima:

```text
StoryWorld → Work → Part → Chapter → Scene
```

Reglas:

- `StoryWorld` es el contenedor superior.
- `Work` contiene el manuscrito concreto.
- `Part` es opcional.
- `Chapter` es opcional según tipo de obra.
- `Scene` es la unidad principal y obligatoria de escritura.
- La documentación compartida de una saga vive en `StoryWorld`.
- El texto escrito vive en `Scene`, dentro de una `Work`.

### 7.1. Tipos base

```ts
export type StoryWorldType =
  | 'standalone'
  | 'trilogy'
  | 'saga'
  | 'series'
  | 'anthology'
  | 'shared_universe'
  | 'custom';

export type WorkType =
  | 'short_story'
  | 'novella'
  | 'light_novel'
  | 'novel'
  | 'long_novel'
  | 'custom';

export type StructureMode =
  | 'scene_only'
  | 'chapters_and_scenes'
  | 'parts_chapters_and_scenes'
  | 'custom';

export type SceneStatus =
  | 'planned'
  | 'draft'
  | 'revision'
  | 'final';

export type SceneType =
  | 'conflict'
  | 'revelation'
  | 'decision'
  | 'tension'
  | 'transition'
  | 'reaction'
  | 'free';
```

### 7.2. StoryWorld

```ts
export type StoryWorld = {
  id: string;
  title: string;
  description?: string;
  type: StoryWorldType;
  narrativeCore?: NarrativeCore;
  works: Work[];
  characters: CharacterCard[];
  places: PlaceCard[];
  plotLines: PlotLine[];
  notes: ProjectNote[];
  references: ReferenceItem[];
  continuityNotes: ContinuityNote[];
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
};
```

### 7.3. Work

```ts
export type Work = {
  id: string;
  storyWorldId: string;
  title: string;
  order: number;
  type: WorkType;
  structureMode: StructureMode;
  narrativeCore?: NarrativeCore;
  parts: Part[];
  chapters: Chapter[];
  scenes: Scene[];
  wordGoal?: number;
  status: SceneStatus;
  createdAt: string;
  updatedAt: string;
};
```

### 7.4. Part, Chapter, Scene

```ts
export type Part = {
  id: string;
  workId: string;
  title: string;
  order: number;
  summary?: string;
  chapterIds: string[];
  status: SceneStatus;
};

export type Chapter = {
  id: string;
  workId: string;
  partId?: string;
  title: string;
  order: number;
  summary?: string;
  sceneIds: string[];
  status: SceneStatus;
};

export type Scene = {
  id: string;
  workId: string;
  partId?: string;
  chapterId?: string;
  title: string;
  order: number;
  type: SceneType;
  customTypeLabel?: string;
  synopsis?: string;
  goal?: string;
  conflict?: string;
  outcome?: string;
  povCharacterId?: string;
  placeId?: string;
  timelineLabel?: string;
  involvedCharacterIds: string[];
  plotLineIds: string[];
  referenceIds: string[];
  notes?: string;
  wordGoal?: number;
  status: SceneStatus;
  content: unknown;
  createdAt: string;
  updatedAt: string;
};
```

---

## 8. Núcleo narrativo

El módulo de Núcleo narrativo es core para 1.0.

No debe almacenarse como una nota genérica.

Puede existir en:

```text
StoryWorld
Work
```

Modelo recomendado:

```ts
export type NarrativeCore = {
  dramaticPremise?: string;
  authorPremise?: string;
  centralQuestion?: string;
  mainTheme?: string;
  centralConflict?: string;
  narrativePromise?: string;
  expectedResolution?: string;
  logline?: string;
};
```

Uso esperado:

- orientar decisiones de trama,
- guiar desarrollo de personajes,
- revisar si una escena aporta al eje de la obra,
- mostrarse en el panel contextual,
- diferenciar premisa global de saga y premisa específica de cada obra.

---

## 9. Tipos de escena

Cada escena debe soportar clasificación narrativa.

Tipos iniciales:

```text
conflict     → Conflicto
revelation   → Revelación
decision     → Decisión
tension      → Tensión / Suspenso
transition   → Transición
reaction     → Reacción
free         → Libre / personalizado
```

Uso técnico:

- filtros,
- badges,
- panel contextual,
- revisión de ritmo,
- futuras estadísticas narrativas.

El análisis automático de ritmo queda post-1.0, pero el campo `scene.type` debe existir desde el modelo base.

---

## 10. Módulos previstos hasta 1.0

### 10.1. Core obligatorio

```text
1. StoryWorld / Mundo narrativo
2. Work / Obra
3. Partes, capítulos y escenas
4. Núcleo narrativo
5. Editor Sofer
6. Panel contextual de escritura
7. Guardado, autoguardado, snapshots y recuperación
8. Personajes
9. Lugares
10. Trama y subtramas
11. Notas vinculadas
12. Exportación RTF
```

### 10.2. Recomendable para 1.0 si no compromete estabilidad

```text
13. Referencias simples
14. Objetivos de palabras y progreso básico
15. Revisión básica por estado
16. Continuidad básica
17. Filtros por tipo/estado de escena
```

### 10.3. Post-1.0

```text
- Cronología avanzada
- Continuidad avanzada
- Glosario / lore avanzado
- Mapa de relaciones entre personajes
- Plantillas narrativas avanzadas
- Exportación DOCX
- Exportación PDF avanzada
- Asistente IA
- Comentarios editoriales
- Control de cambios
- Adjuntos pesados
- Estadísticas narrativas avanzadas
- Análisis automático de ritmo
- Sincronización cloud
- Colaboración multiusuario
```

---

## 11. Modelos de módulos narrativos

```ts
export type CharacterCard = {
  id: string;
  storyWorldId: string;
  name: string;
  role?: string;
  description?: string;
  motivation?: string;
  internalConflict?: string;
  externalConflict?: string;
  notes?: string;
  relatedWorkIds: string[];
  relatedSceneIds: string[];
};

export type PlaceCard = {
  id: string;
  storyWorldId: string;
  name: string;
  description?: string;
  notes?: string;
  relatedWorkIds: string[];
  relatedSceneIds: string[];
};

export type PlotLine = {
  id: string;
  storyWorldId: string;
  title: string;
  description?: string;
  type: 'main' | 'subplot' | 'global';
  status: 'planned' | 'active' | 'resolved' | 'paused';
  relatedWorkIds: string[];
  relatedSceneIds: string[];
};

export type ProjectNote = {
  id: string;
  storyWorldId: string;
  title: string;
  body: string;
  scope: 'story_world' | 'work' | 'part' | 'chapter' | 'scene' | 'character' | 'place' | 'plot';
  relatedEntityId?: string;
  createdAt: string;
  updatedAt: string;
};

export type ReferenceItem = {
  id: string;
  storyWorldId: string;
  title: string;
  description?: string;
  url?: string;
  excerpt?: string;
  relatedWorkIds: string[];
  relatedSceneIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type ContinuityNote = {
  id: string;
  storyWorldId: string;
  title: string;
  body: string;
  relatedWorkIds: string[];
  relatedSceneIds: string[];
  createdAt: string;
  updatedAt: string;
};
```

---

## 12. Layout funcional

La UI debe soportar un layout de escritura con paneles.

### 12.1. Modo concentración

```text
┌──────────────────────────────────────────────┐
│ Editor Sofer                                 │
│                                              │
│ Texto de la escena activa...                 │
└──────────────────────────────────────────────┘
```

### 12.2. Modo contexto

```text
┌──────────────────────────┬──────────────────────────┐
│ Editor Sofer              │ Panel contextual          │
│                           │                          │
│ Texto de la escena...     │ Escena                    │
│                           │ Capítulo                  │
│                           │ Parte                     │
│                           │ Obra                      │
│                           │ Mundo narrativo           │
│                           │ Núcleo narrativo          │
│                           │ Personajes / lugares      │
└──────────────────────────┴──────────────────────────┘
```

Reglas:

- El panel contextual debe ser cerrable.
- El editor no debe desmontarse al abrir/cerrar el panel.
- El cursor y selección deben preservarse.
- El layout debe poder persistirse localmente.
- El panel contextual no debe competir visualmente con el texto principal.

### 12.3. Panel izquierdo

Puede existir como árbol de navegación:

```text
Mundo narrativo
└── Obra
    └── Parte
        └── Capítulo
            └── Escena
```

Debe ser ocultable o compacto en modo foco.

---

## 13. Editor Sofer

Toolbar inicial:

```text
- Negrita
- Cursiva
- Subrayado si entra temprano
- Párrafo
- Título simple
- Lista básica si no complica exportación
- Separador de escena
- Deshacer / rehacer
```

Reglas:

- No implementar una toolbar tipo Word completa en 1.0.
- No agregar funciones que no puedan persistirse/exportarse de manera confiable.
- La toolbar debe estar desacoplada del editor.
- Los comandos del editor deben vivir en `lib/editor/`.
- El contenido se guarda por escena.

---

## 14. Storage, autoguardado y recuperación

Prioridad máxima: no perder texto.

Requisitos:

```text
- Crear proyecto local
- Abrir proyecto local
- Guardar proyecto local
- Autoguardado configurable
- Snapshots periódicos
- Recuperación ante cierre inesperado
- Indicador Guardado / Sin guardar
- Validación básica de integridad
- Migraciones futuras de estructura
```

Reglas:

- No guardar solo en memoria.
- No depender de `localStorage` como almacenamiento principal del manuscrito.
- `localStorage` puede usarse para preferencias de UI, no como fuente principal del proyecto.
- La estructura del archivo debe poder migrarse en futuras versiones.

---

## 15. Exportación

Exportación principal para 1.0:

```text
RTF
```

Exportaciones permitidas en 1.0:

```text
- Obra completa a RTF
- Parte a RTF
- Capítulo a RTF
- Escena a RTF
- TXT opcional
```

Post-1.0:

```text
- DOCX
- PDF avanzado
- Plantillas de exportación
```

Reglas:

- RTF debe conservar estructura básica.
- La exportación debe compilar escenas en orden.
- No exportar datos internos salvo que el usuario lo elija explícitamente.
- No intentar maquetación editorial avanzada en 1.0.

---

## 16. i18n

Idioma inicial:

```text
es-AR
```

Reglas:

- Todo texto visible de UI debe salir de `src/i18n/locales/es-AR.json`.
- No hardcodear textos visibles en componentes.
- Excepción: nombres de marca como `Kohelet` y `Sofer`.
- Las claves deben ser estables y agrupadas por módulo.

Ejemplo:

```json
{
  "editor": {
    "toolbar": {
      "bold": "Negrita",
      "italic": "Cursiva"
    }
  },
  "scene": {
    "types": {
      "conflict": "Conflicto",
      "revelation": "Revelación",
      "decision": "Decisión",
      "tension": "Tensión / Suspenso",
      "transition": "Transición",
      "reaction": "Reacción",
      "free": "Libre"
    }
  }
}
```

---

## 17. Testing

Stack:

```text
Vitest
React Testing Library
```

Prioridades de test:

```text
- Modelos y validaciones de StoryWorld/Work/Scene
- Creación y navegación de estructura narrativa
- Guardado/autoguardado/snapshots
- Serialización del editor
- Compilación de manuscrito para exportación
- Componentes críticos del editor y panel contextual
- i18n básico para evitar textos hardcodeados críticos
```

Comandos esperados:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

En WSL, cuando aplique:

```bash
source ~/.nvm/nvm.sh && nvm use 24
```

---

## 18. Reglas para Codex Cloud / Codex local

Codex debe:

- Leer `project_requirements.md` antes de planificar cambios grandes.
- Leer `roadmap.md` para entender dirección de producto.
- Leer `docs/index.md` para ubicar documentación específica.
- Actualizar `docs/task.md` al cerrar fases/bloques.
- Registrar decisiones relevantes en `docs/decisions.md`.
- No inflar `AGENTS.md` con detalles técnicos que pertenecen a docs.
- No introducir módulos post-1.0 sin aprobación explícita.
- No convertir Kohelet en un editor genérico tipo Word.
- No romper i18n con textos visibles hardcodeados.
- No mezclar storage, editor, exportación y UI en componentes gigantes.

---

## 19. Criterios de éxito para 1.0

Kohelet 1.0 será exitoso si permite:

```text
- Crear un mundo narrativo o proyecto independiente.
- Crear una obra dentro de ese mundo.
- Organizar partes, capítulos y escenas según el tipo de obra.
- Definir el núcleo narrativo de la obra.
- Escribir escenas con Sofer.
- Consultar contexto narrativo lateral sin perder foco.
- Crear personajes, lugares, tramas y notas vinculadas.
- Guardar y recuperar el proyecto de forma segura.
- Exportar el manuscrito a RTF.
```

---

## 20. Límites de alcance hacia 1.0

No implementar antes de 1.0 sin aprobación explícita:

```text
- Asistente IA
- Sincronización cloud
- Colaboración multiusuario
- Comentarios editoriales avanzados
- Control de cambios
- Exportación DOCX completa
- Exportación PDF avanzada
- Cronología avanzada
- Mapas visuales complejos
- Adjuntos pesados
- Análisis automático de ritmo
- Plantillas narrativas avanzadas
```

---

## 21. Regla final de implementación

Antes de agregar una feature, validar que responda al menos una pregunta:

```text
¿Ayuda a planificar mejor?
¿Ayuda a escribir con más foco?
¿Ayuda a no perder texto?
¿Ayuda a entender la historia?
¿Ayuda a exportar el manuscrito?
```

Si no responde ninguna, no pertenece al camino hacia 1.0.
