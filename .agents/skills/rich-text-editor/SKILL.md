---
name: rich-text-editor
description: Use when working on the Sofer rich-text editor, Tiptap/ProseMirror setup, toolbar buttons, editor commands, shortcuts, serialization, scene content, manuscript compilation, or editor UI integration. Do not use for unrelated UI panels, pure docs, or storage work unless editor content persistence is involved.
---

# Rich Text Editor Skill — Sofer / Kohelet

Use this skill when implementing or modifying the Sofer editor, Tiptap configuration, toolbar actions, editor commands, serialization, shortcuts, scene content, or manuscript compilation.

Sofer is not a generic Word clone. It is the focused writing editor inside Kohelet. It edits scenes and supports narrative context.

## Required reading

Before editor changes, read:

1. `project_requirements.md`
2. `DESIGN.md`
3. `docs/editor-core.md`, if it exists
4. `docs/data-model.md`, if it exists
5. `docs/export.md`, if export/compilation is touched
6. Existing files under `src/components/editor/`
7. Existing files under `src/lib/editor/`
8. `src/i18n/locales/es-AR.json`, if visible toolbar labels/tooltips are touched

## Core product rule

The scene is the main writing unit.

Sofer edits:

```text
Scene.content
```

It must not treat the full book as one giant editable document.

The narrative hierarchy remains:

```text
StoryWorld → Work → Part → Chapter → Scene
```

## Tiptap / ProseMirror rules

Use Tiptap as the rich-text engine.

Rules:

- Store editor content as structured JSON.
- Do not use the visible DOM as the source of truth.
- Do not serialize from `innerHTML` for primary storage.
- Keep editor extensions centralized in `src/lib/editor/editorExtensions.ts` or equivalent.
- Keep commands centralized in `src/lib/editor/editorCommands.ts` or equivalent.
- Keep serialization helpers in `src/lib/editor/editorSerialization.ts` or equivalent.
- Keep shortcuts in `src/lib/editor/editorShortcuts.ts` or equivalent.

If those files do not exist and the task needs them, create them with minimal, focused responsibilities.

## Component boundaries

Recommended separation:

```text
src/components/editor/RichTextEditor.tsx
→ mounts and configures the editor UI shell.

src/components/editor/RichTextToolbar.tsx
→ renders toolbar buttons and invokes commands.

src/components/editor/EditorShell.tsx
→ layout wrapper around editor, status bar and toolbar.

src/components/editor/EditorStatusBar.tsx
→ word count, save state, scene status, etc.

src/lib/editor/editorExtensions.ts
→ Tiptap extensions.

src/lib/editor/editorCommands.ts
→ command wrappers.

src/lib/editor/editorSerialization.ts
→ validation, JSON conversion, defaults.
```

Do not put toolbar command logic, export conversion, storage writes, and UI layout into one component.

## Editor lifecycle

The editor must remain stable when panels open/close.

Especially:

- Opening the contextual panel must not remount the editor unnecessarily.
- Closing the contextual panel must preserve cursor and selection when possible.
- Switching between focus mode and context mode must not lose unsaved content.
- Autosave should observe content changes without blocking typing.

Avoid using a React `key` that forces editor remount unless intentionally switching to another scene.

## Supported toolbar scope for 1.0

Initial toolbar should stay small and reliable:

```text
bold
italic
underline, if already supported cleanly
paragraph
heading simple
basic list, if export-safe
scene separator
undo
redo
```

Do not add features that cannot be stored and exported reliably.

Post-1.0 unless explicitly approved:

```text
advanced tables
complex image embeds
comments/editorial markup
track changes
advanced styles like Word
custom document templates inside editor
```

## Commands

Toolbar buttons should call editor commands through a small command layer.

Good:

```ts
export function toggleBold(editor: Editor | null) {
  if (!editor) return;
  editor.chain().focus().toggleBold().run();
}
```

Avoid sprinkling raw command chains throughout unrelated components.

## Serialization

Content should have a safe default document.

Recommended behavior:

- Empty scene creates a valid empty Tiptap document.
- Invalid/missing content should not crash the editor.
- Use runtime guards before loading external project data.
- Keep schema/version in mind for future migrations.

Never silently discard content. If parsing fails, surface recovery information and preserve the raw payload when possible.

## Scene metadata integration

The editor may display or interact with scene metadata, but it should not own all metadata logic.

Scene metadata includes:

```text
scene type
status
synopsis
goal
conflict
outcome
POV character
place
related characters
plot lines
notes
word goal
```

Keep metadata panels separate from the editor body. Use the contextual panel for scene/chapter/part/work/story-world context.

## Contextual panel interaction

When the writer opens context mode:

```text
[ Sofer editor ] [ Contextual panel ]
```

Rules:

- Do not remount Sofer just because the panel width changes.
- Do not visually overpower the writing surface.
- The context panel may show Narrative Core, scene metadata, characters, places, plot lines, continuity notes, etc.
- The editor should remain keyboard-friendly.

## Word count and status

Word counts should be derived from editor content through a utility, not by duplicating text state in components.

Recommended location:

```text
src/lib/writing/wordCount.ts
```

The editor/status bar may show:

```text
word count
scene status
saved/unsaved state
active scene title
```

## i18n

Toolbar labels, tooltips and status text must use i18n keys.

Examples:

```text
editor.toolbar.bold
editor.toolbar.italic
editor.toolbar.undo
editor.status.saved
editor.status.unsaved
```

Brand/module names like `Sofer` may remain literal.

## CSS

If editor components need styling, use the `css-modules-ui` skill.

Expected pairing:

```text
RichTextEditor.tsx       → RichTextEditor.module.css
RichTextToolbar.tsx      → RichTextToolbar.module.css
EditorShell.tsx          → EditorShell.module.css
EditorStatusBar.tsx      → EditorStatusBar.module.css
```

Use `:global(.ProseMirror)` only inside a scoped editor class.

## Export interaction

Export should compile structured content from scenes in order.

Do not export by scraping the live editor DOM.

For RTF export, use a compiler path similar to:

```text
StoryWorld/Work structure → ordered scenes → rich-text JSON → compiled manuscript → RTF
```

## Tests

Use the `testing-react` skill when adding or changing editor behavior.

Priority tests:

- editor renders valid empty content
- toolbar command invokes expected editor behavior
- serialization round-trips valid content
- invalid content does not crash
- word count utility works for basic content
- context panel layout changes do not erase content

## Do not

- Do not build a Word clone.
- Do not store editor content as uncontrolled DOM HTML.
- Do not add editor features that break export.
- Do not hardcode toolbar labels.
- Do not mix Tiptap extension setup with unrelated app state.
- Do not let context-mode layout remount the editor unnecessarily.

## Completion checklist

Before finishing an editor task:

1. Content remains scene-based.
2. Tiptap config/commands/serialization are separated where possible.
3. The editor handles empty and invalid content safely.
4. Toolbar labels use i18n.
5. CSS Modules are used for editor components.
6. No unsupported Word-like feature was introduced.
7. Relevant tests were added or updated.
8. Run or report:

```bash
pnpm run lint
pnpm run test
pnpm run build
```
