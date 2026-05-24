# docs/data-model.md — Kohelet

> Documento del modelo de datos narrativo.  
> Define entidades, relaciones, tipos, invariantes y reglas de validación para que Codex no improvise la estructura de la historia.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Objetivo

Kohelet debe soportar desde un cuento corto hasta una saga o universo compartido.

La jerarquía narrativa máxima es:

```text
StoryWorld → Work → Part → Chapter → Scene
```

Reglas centrales:

- `StoryWorld` es el contenedor superior.
- `Work` es una obra concreta: cuento, novela, volumen, libro.
- `Part` es opcional.
- `Chapter` es opcional según tipo de obra.
- `Scene` es la unidad principal y obligatoria de escritura.
- La documentación compartida vive en `StoryWorld`.
- El texto escrito vive en `Scene`.

---

## 2. Casos que debe cubrir

```text
Cuento corto independiente
StoryWorld → Work → Scene

Novela corta
StoryWorld → Work → Chapter → Scene

Novela larga
StoryWorld → Work → Part → Chapter → Scene

Trilogía
StoryWorld → Work 1
           → Work 2
           → Work 3

Saga / serie / universo compartido
StoryWorld → múltiples Works
           → documentación compartida
```

No todos los proyectos necesitan partes o capítulos. La app no debe obligar a usar niveles que el escritor no necesita.

---

## 3. Tipos base

```ts
export type ID = string;
export type ISODateString = string;

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

---

## 4. StoryWorld

`StoryWorld` representa el contenedor narrativo completo.

Puede ser:

- una obra independiente,
- una trilogía,
- una saga,
- una serie,
- una antología,
- un universo compartido.

```ts
export type StoryWorld = {
  id: ID;
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
```

Reglas:

- Debe tener al menos una `Work` para contener texto.
- Puede tener documentación compartida aunque solo haya una obra.
- Personajes, lugares, tramas globales, continuidad y referencias viven acá para evitar duplicación en sagas.

---

## 5. Work

`Work` representa una obra concreta dentro de un mundo narrativo.

Ejemplos:

- cuento corto,
- novela corta,
- novela ligera,
- novela,
- novela larga,
- libro 1 de una trilogía,
- volumen de una saga.

```ts
export type Work = {
  id: ID;
  storyWorldId: ID;
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
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
```

Reglas:

- `order` define posición dentro del `StoryWorld`.
- `structureMode` define si usa escenas solamente, capítulos, o partes + capítulos.
- `parts`, `chapters` y `scenes` pueden existir como listas planas vinculadas por IDs.
- No duplicar una escena dentro de capítulo y parte; usar IDs/vínculos.

---

## 6. Part

`Part` es una división grande dentro de una obra.

```ts
export type Part = {
  id: ID;
  workId: ID;
  title: string;
  order: number;
  summary?: string;
  chapterIds: ID[];
  status: SceneStatus;
};
```

Reglas:

- Es opcional.
- Puede agrupar capítulos.
- No debe ser obligatoria para cuentos o novelas cortas.

---

## 7. Chapter

`Chapter` representa un capítulo dentro de una obra.

```ts
export type Chapter = {
  id: ID;
  workId: ID;
  partId?: ID;
  title: string;
  order: number;
  summary?: string;
  sceneIds: ID[];
  status: SceneStatus;
};
```

Reglas:

- Puede tener `partId` o no.
- Debe ordenar escenas mediante `sceneIds`.
- Puede usarse en novelas y novelas cortas.
- En modo `scene_only`, los capítulos pueden no existir.

---

## 8. Scene

`Scene` es la unidad principal de escritura.

```ts
export type Scene = {
  id: ID;
  workId: ID;
  partId?: ID;
  chapterId?: ID;
  title: string;
  order: number;
  type: SceneType;
  customTypeLabel?: string;
  synopsis?: string;
  goal?: string;
  conflict?: string;
  outcome?: string;
  povCharacterId?: ID;
  placeId?: ID;
  timelineLabel?: string;
  involvedCharacterIds: ID[];
  plotLineIds: ID[];
  referenceIds: ID[];
  notes?: string;
  wordGoal?: number;
  status: SceneStatus;
  content: unknown;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
```

Reglas:

- Siempre pertenece a una `Work`.
- Puede pertenecer a un `Chapter`.
- Puede pertenecer indirectamente a una `Part`.
- Su `content` debe guardar JSON estructurado del editor Sofer.
- No se debe exportar desde el DOM visible.

---

## 9. Tipos de escena

Tipos iniciales:

| Tipo | Uso |
|---|---|
| `conflict` | Personajes chocan por intereses opuestos. |
| `revelation` | Información crucial cambia la trama o perspectiva. |
| `decision` | Un personaje sopesa opciones y toma un camino difícil. |
| `tension` | Aumenta ritmo, peligro, suspenso o incertidumbre. |
| `transition` | Conecta eventos, lugares o saltos temporales. |
| `reaction` | Personajes procesan emocionalmente un evento importante. |
| `free` | Tipo libre o personalizado. |

Reglas:

- `type` debe existir desde el modelo base.
- Si `type === 'free'`, `customTypeLabel` puede definir el nombre visible.
- Los labels visibles deben salir de i18n.
- El análisis automático de ritmo queda post-1.0.

---

## 10. Núcleo narrativo

`NarrativeCore` guarda el eje rector de la historia.

Puede existir en:

```text
StoryWorld
Work
```

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

Campos:

| Campo | Uso |
|---|---|
| `dramaticPremise` | Concepto básico: “¿Qué pasaría si...?” |
| `authorPremise` | Mensaje, tesis o premisa de autor. |
| `centralQuestion` | Pregunta dramática central. |
| `mainTheme` | Tema principal. |
| `centralConflict` | Conflicto rector. |
| `narrativePromise` | Promesa narrativa al lector. |
| `expectedResolution` | Dirección esperada de resolución. |
| `logline` | Resumen breve comercial/narrativo. |

Regla: no guardar la premisa como una nota genérica.

---

## 11. Módulos narrativos compartidos

```ts
export type CharacterCard = {
  id: ID;
  storyWorldId: ID;
  name: string;
  role?: string;
  description?: string;
  motivation?: string;
  internalConflict?: string;
  externalConflict?: string;
  notes?: string;
  relatedWorkIds: ID[];
  relatedSceneIds: ID[];
};

export type PlaceCard = {
  id: ID;
  storyWorldId: ID;
  name: string;
  description?: string;
  notes?: string;
  relatedWorkIds: ID[];
  relatedSceneIds: ID[];
};

export type PlotLine = {
  id: ID;
  storyWorldId: ID;
  title: string;
  description?: string;
  type: 'main' | 'subplot' | 'global';
  status: 'planned' | 'active' | 'resolved' | 'paused';
  relatedWorkIds: ID[];
  relatedSceneIds: ID[];
};
```

Reglas:

- Personajes y lugares viven a nivel `StoryWorld` para poder compartirse entre obras.
- Se vinculan a obras y escenas por IDs.
- Una escena puede tener múltiples personajes, tramas y referencias.

---

## 12. Notas, referencias y continuidad

```ts
export type ProjectNote = {
  id: ID;
  storyWorldId: ID;
  title: string;
  body: string;
  scope: 'story_world' | 'work' | 'part' | 'chapter' | 'scene' | 'character' | 'place' | 'plot';
  relatedEntityId?: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ReferenceItem = {
  id: ID;
  storyWorldId: ID;
  title: string;
  description?: string;
  url?: string;
  excerpt?: string;
  relatedWorkIds: ID[];
  relatedSceneIds: ID[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ContinuityNote = {
  id: ID;
  storyWorldId: ID;
  title: string;
  body: string;
  relatedWorkIds: ID[];
  relatedSceneIds: ID[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
```

Para 1.0, referencias y continuidad pueden ser simples. Cronología avanzada queda post-1.0.

---

## 13. ProjectSettings

```ts
export type ThemePreference = 'light' | 'dark' | 'system';

export type ProjectSettings = {
  schemaVersion: number;
  language: 'es-AR';
  themePreference?: ThemePreference;
  autosaveEnabled: boolean;
  autosaveIntervalMs: number;
  snapshotEnabled: boolean;
};
```

Reglas:

- `schemaVersion` es obligatorio para migraciones.
- Preferencias de UI pueden persistirse fuera del archivo de proyecto si conviene.
- El idioma inicial es `es-AR`.

---

## 14. Invariantes

Validaciones mínimas:

- Todo `StoryWorld` tiene `id`, `title`, `type`, `settings`, `createdAt`, `updatedAt`.
- Toda `Work` pertenece a un `StoryWorld`.
- Toda `Scene` pertenece a una `Work`.
- `Part` y `Chapter` son opcionales.
- Una `Scene` con `chapterId` debe referenciar un `Chapter` existente.
- Una `Chapter` con `partId` debe referenciar una `Part` existente.
- `order` debe ser estable dentro de cada lista.
- IDs relacionados deben existir o limpiarse durante validación/migración.
- `content` debe ser serializable.

---

## 15. Modelo de archivo local

El archivo de proyecto puede contener:

```ts
export type KoheletProjectFile = {
  app: 'kohelet';
  schemaVersion: number;
  savedAt: ISODateString;
  storyWorld: StoryWorld;
};
```

Reglas:

- No depender de estructura implícita.
- Incluir `schemaVersion` siempre.
- Permitir migraciones futuras.
- Validar integridad al abrir.

---

## 16. Migraciones

Toda migración debe:

- recibir una versión anterior,
- devolver una versión válida nueva,
- no borrar contenido escrito,
- registrar fallback cuando haya datos desconocidos,
- tener tests.

Archivo sugerido:

```text
src/lib/storage/migrations.ts
```

---

## 17. Checklist para Codex

Antes de cambiar el modelo:

- [ ] Revisar `project_requirements.md`.
- [ ] Revisar este archivo.
- [ ] Verificar si la decisión requiere ADR en `docs/decisions.md`.
- [ ] Actualizar tipos y validaciones juntos.
- [ ] Actualizar tests del modelo.
- [ ] Actualizar storage/export si el cambio afecta serialización.
- [ ] No introducir módulos post-1.0 sin aprobación.
