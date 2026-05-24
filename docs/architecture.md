# docs/architecture.md — Kohelet

> Documento de arquitectura técnica y organización del código.  
> Debe ayudar a Codex, Codex Cloud y colaboradores humanos a ubicar responsabilidades sin mezclar editor, UI, storage, exportación y modelo narrativo.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Objetivo

Kohelet debe ser una aplicación de escritorio para escritores, construida alrededor de una estructura narrativa clara:

```text
StoryWorld → Work → Part → Chapter → Scene
```

La arquitectura debe proteger tres prioridades:

```text
1. escribir con foco,
2. no perder texto,
3. mantener la historia organizada.
```

Kohelet no debe crecer como una suma de componentes sueltos. Cada módulo debe tener una responsabilidad clara y estar conectado al flujo narrativo.

---

## 2. Stack base

Stack previsto:

```text
Tauri 2
React
TypeScript
Vite
pnpm
Tiptap
CSS Modules
CSS variables / design tokens
Vitest
React Testing Library
GitHub Actions
```

Reglas:

- Usar `pnpm`.
- Usar TypeScript de forma estricta.
- Evitar `any`.
- Usar `unknown` para contenido rich-text serializado cuando corresponda.
- No mezclar lógica de Tauri, editor, exportación y UI en el mismo componente.

---

## 3. Capas principales

La app se organiza en capas conceptuales:

```text
App shell
→ arranque, providers, rutas o vistas raíz.

Layout
→ escritorio, panel izquierdo, editor, panel contextual, barras.

Domain model
→ StoryWorld, Work, Part, Chapter, Scene, módulos narrativos.

Editor
→ Sofer, Tiptap, toolbar, comandos, serialización.

Storage
→ archivos locales, autosave, snapshots, recovery, migraciones.

Export
→ compilación del manuscrito, RTF, TXT opcional.

i18n
→ textos visibles en es-AR y preparación para futuros idiomas.

Testing
→ validaciones de modelo, UI, storage, editor y exportación.
```

Ninguna capa debe depender de detalles internos innecesarios de otra.

---

## 4. Estructura recomendada de carpetas

```text
src/
  app/
    App.tsx
    AppRoutes.tsx
    providers/

  components/
    common/
    editor/
      RichTextEditor.tsx
      RichTextEditor.module.css
      RichTextToolbar.tsx
      RichTextToolbar.module.css
      EditorShell.tsx
      EditorShell.module.css
      EditorStatusBar.tsx
      EditorStatusBar.module.css
    layout/
      AppChrome.tsx
      AppChrome.module.css
      WritingWorkspace.tsx
      WritingWorkspace.module.css
      ContextualLayout.tsx
      ContextualLayout.module.css
    project/
      StoryWorldTree.tsx
      StoryWorldTree.module.css
      WorkItem.tsx
      WorkItem.module.css
      PartItem.tsx
      PartItem.module.css
      ChapterItem.tsx
      ChapterItem.module.css
      SceneItem.tsx
      SceneItem.module.css
    contextual/
      ContextPanel.tsx
      ContextPanel.module.css
      SceneContextPanel.tsx
      SceneContextPanel.module.css
      WorkContextPanel.tsx
      WorkContextPanel.module.css
      StoryWorldContextPanel.tsx
      StoryWorldContextPanel.module.css
    modules/
      NarrativeCorePanel.tsx
      NarrativeCorePanel.module.css
      CharactersPanel.tsx
      CharactersPanel.module.css
      PlacesPanel.tsx
      PlacesPanel.module.css
      PlotPanel.tsx
      PlotPanel.module.css
      ReferencesPanel.tsx
      ReferencesPanel.module.css
      NotesPanel.tsx
      NotesPanel.module.css
      GoalsPanel.tsx
      GoalsPanel.module.css
      ReviewPanel.tsx
      ReviewPanel.module.css
    modals/
      ConfirmDeleteDialog.tsx
      ConfirmDeleteDialog.module.css
      ExportDialog.tsx
      ExportDialog.module.css
      RecoveryDialog.tsx
      RecoveryDialog.module.css

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
      projectFileFormat.ts
    export/
      compileManuscript.ts
      exportRtf.ts
      exportPlainText.ts
      exportTypes.ts
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
```

---

## 5. Estrategia de CSS

Kohelet usa CSS Modules para estilos de componentes.

Regla central:

```text
ComponentName.tsx → ComponentName.module.css
ComponentName.jsx → ComponentName.module.css
```

CSS global permitido:

```text
src/styles/tokens.css
src/styles/globals.css
```

Uso esperado:

```css
.root {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
```

Prohibido:

```css
.root {
  background: #fffaf2;
  color: #241c15;
}
```

Motivo: los componentes deben funcionar en modo claro, modo oscuro y preferencia del sistema.

---

## 6. Layout de aplicación

Kohelet debe sentirse como una app de escritorio, no como una landing page ni como un dashboard web.

### 6.1. Estructura base

```text
┌────────────────────────────────────────────────────────────┐
│ Top bar / App chrome                                       │
├───────────────┬──────────────────────────────┬─────────────┤
│ Árbol          │ Editor Sofer                 │ Panel        │
│ narrativo      │                              │ contextual   │
│ opcional       │                              │ opcional     │
├───────────────┴──────────────────────────────┴─────────────┤
│ Status bar                                                  │
└────────────────────────────────────────────────────────────┘
```

### 6.2. Modo concentración

```text
[ árbol compacto u oculto ] [ editor amplio ]
```

### 6.3. Modo contexto

```text
[ árbol ] [ editor 50-60% ] [ panel contextual 40-50% ]
```

Reglas:

- El editor no debe desmontarse al abrir/cerrar el panel contextual.
- El cursor y la selección deben preservarse.
- El panel contextual debe ser temporal y cerrable.
- El layout puede persistirse como preferencia local de UI.

---

## 7. App shell

`src/app/` contiene el arranque de la aplicación.

Responsabilidades:

- montar providers,
- inicializar i18n,
- aplicar tema claro/oscuro/sistema,
- montar layout raíz,
- manejar vistas principales.

No debe contener:

- lógica de editor Tiptap,
- lógica de storage,
- compilación de exportación,
- validaciones profundas del modelo.

---

## 8. Componentes de layout

Componentes previstos:

```text
AppChrome
WritingWorkspace
ContextualLayout
StoryWorldTree
ContextPanel
EditorShell
EditorStatusBar
```

Reglas:

- Cada componente visual debe tener su `.module.css` homónimo.
- Los componentes de layout no deben conocer detalles internos de storage.
- El layout debe usar props y estado de UI, no leer archivos directamente.
- No convertir `WritingWorkspace` en un componente gigante con toda la app adentro.

---

## 9. Modelo de dominio

El modelo vive en:

```text
src/lib/model/
```

Responsabilidades:

- tipos TypeScript,
- constructores/factories si hacen falta,
- validaciones,
- invariantes,
- utilidades de ordenamiento,
- migraciones de estructura cuando corresponda.

Regla: el modelo no debe depender de React.

---

## 10. Editor Sofer

El editor vive en dos áreas:

```text
src/components/editor/
src/lib/editor/
```

`components/editor/` contiene UI.

`lib/editor/` contiene:

- extensiones,
- comandos,
- serialización,
- shortcuts,
- normalización del contenido.

Reglas:

- El editor edita escenas.
- El contenido se guarda como JSON estructurado.
- El DOM visible no es fuente de verdad para exportación.
- La toolbar debe estar desacoplada del editor.

---

## 11. Storage

El storage vive en:

```text
src/lib/storage/
```

Responsabilidades:

- guardar proyecto local,
- abrir proyecto local,
- autosave,
- snapshots,
- recovery,
- validación de integridad,
- migraciones.

Reglas:

- No depender de `localStorage` como almacenamiento principal.
- `localStorage` solo puede usarse para preferencias de UI.
- No guardar proyectos solo en memoria.
- No perder texto es prioridad máxima.

---

## 12. Exportación

La exportación vive en:

```text
src/lib/export/
```

Responsabilidades:

- compilar escenas en orden,
- producir RTF,
- producir TXT opcional,
- respetar estructura de obra, parte, capítulo y escena,
- excluir datos internos salvo elección explícita.

Reglas:

- RTF es la exportación principal para 1.0.
- DOCX y PDF avanzado quedan post-1.0.
- La exportación no debe depender del DOM del editor.

---

## 13. i18n

La UI visible debe salir de:

```text
src/i18n/locales/es-AR.json
```

Reglas:

- No hardcodear textos visibles en componentes.
- Excepciones: nombres de marca `Kohelet` y `Sofer`.
- Las claves deben agruparse por módulo.
- Los labels de tipos de escena, estados, botones y mensajes de error deben estar en i18n.

---

## 14. Estado de aplicación

Este documento no impone una librería global de estado para 1.0.

Criterio inicial:

- usar estado local cuando alcance,
- usar hooks o providers cuando el estado atraviese varias ramas,
- evitar introducir una dependencia global sin necesidad real,
- aislar la persistencia en servicios de `lib/storage/`.

Si se agrega una librería de estado, debe registrarse en `docs/decisions.md`.

---

## 15. Dependencias permitidas y criterio

Dependencias ya contempladas:

```text
Tauri 2
React
TypeScript
Vite
Tiptap
lucide-react
react-resizable-panels
Vitest
React Testing Library
```

Antes de agregar una dependencia, validar:

```text
¿Resuelve un problema real de 1.0?
¿Evita código frágil?
¿No compromete desktop/Tauri?
¿No reemplaza una solución simple?
¿Puede testearse?
```

Registrar dependencias relevantes en `docs/decisions.md`.

---

## 16. Anti-patrones arquitectónicos

Evitar:

- componentes gigantes,
- CSS global para componentes,
- colores hardcodeados,
- textos visibles hardcodeados,
- editor acoplado a storage,
- exportación basada en DOM,
- guardar manuscrito en `localStorage`,
- modelos sin tipos,
- funciones con `any`,
- módulos narrativos decorativos sin vínculo con escenas/obras,
- implementar features post-1.0 sin aprobación.

---

## 17. Checklist para Codex

Antes de cerrar una tarea de arquitectura:

- [ ] El cambio respeta `project_requirements.md`.
- [ ] El cambio respeta `DESIGN.md` si toca UI.
- [ ] La responsabilidad quedó en la carpeta correcta.
- [ ] No se mezclaron capas innecesariamente.
- [ ] No se agregaron dependencias sin motivo.
- [ ] Se actualizaron docs específicas si cambió el diseño técnico.
- [ ] Se actualizó `docs/task.md` si corresponde.
- [ ] Se registró una decisión en `docs/decisions.md` si corresponde.
