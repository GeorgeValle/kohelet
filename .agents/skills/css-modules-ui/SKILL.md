---
name: css-modules-ui
description: Use when creating or editing React UI, JSX/TSX components, CSS Modules, design tokens, layout, light/dark themes, focus states, panels, buttons, forms, badges, app shell, or visual states in Kohelet. Do not use for pure storage, pure data-model, or backend-only changes unless they touch UI styling.
---

# CSS Modules UI Skill — Kohelet

Use this skill whenever the task touches React components, component-level CSS, layout, UI states, theme tokens, design consistency, or visual behavior.

Kohelet is a calm desktop writing application for long-form narrative work. It must not feel like a marketing page, generic note app, dashboard template, or Word clone.

## Required reading

Before making UI/style changes, read the most relevant files:

1. `DESIGN.md`
2. `project_requirements.md`
3. `src/styles/tokens.css`, if it exists
4. `src/styles/globals.css`, if it exists
5. The target component `.tsx` / `.jsx` file
6. The target component `.module.css` file, if it exists
7. `src/i18n/locales/es-AR.json`, if visible UI text is added or changed

If `DESIGN.md` or tokens are missing and the task is to create the first UI layer, create minimal foundations instead of inventing one-off component colors.

## CSS strategy

Kohelet uses:

- CSS Modules for component-level styles.
- Plain global CSS only for true global behavior and design tokens.

Allowed global CSS files:

```text
src/styles/tokens.css
src/styles/globals.css
```

Component styles must use `.module.css`.

Do not create plain `.css` files for component styles.

## Homonymous file rule

Every component that needs styles must have a same-basename CSS Module file.

Examples:

```text
WritingWorkspace.tsx      → WritingWorkspace.module.css
ContextPanel.tsx          → ContextPanel.module.css
RichTextToolbar.tsx       → RichTextToolbar.module.css
SceneItem.jsx             → SceneItem.module.css
```

Import CSS Modules as:

```tsx
import styles from './WritingWorkspace.module.css';
```

Use classes as:

```tsx
<section className={styles.root}>
```

If a component does not need unique styles, do not create an empty `.module.css` file just to satisfy the pattern. Create the CSS Module when the component actually has styling responsibility.

## Token-first styling

Use semantic CSS variables from `src/styles/tokens.css` whenever a token exists.

Good:

```css
.root {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
```

Avoid:

```css
.root {
  background: #fffaf2;
  color: #241c15;
  border-radius: 10px;
}
```

Hardcoded values are acceptable only when they are truly component-specific measurements and no token exists yet. If the value will be reused, add or request a token.

## Theme support

Every styled component must work in:

- light theme
- dark theme
- system theme

Use semantic tokens, not raw theme colors.

Prefer token names like:

```text
--color-bg-app
--color-bg-surface
--color-bg-editor
--color-bg-panel
--color-text-primary
--color-text-muted
--color-border-subtle
--color-border-strong
--color-accent
--color-accent-hover
--color-danger
--color-warning
--color-success
--focus-ring
--shadow-panel
```

Do not create a component that only looks correct in one theme.

## CSS Modules naming

Use semantic class names based on component structure or state.

Good:

```css
.root {}
.header {}
.title {}
.subtitle {}
.body {}
.footer {}
.actions {}
.primaryAction {}
.secondaryAction {}
.panel {}
.editorPane {}
.contextPane {}
.emptyState {}
.loadingState {}
.errorState {}
```

Avoid:

```css
.bigBox {}
.leftThing {}
.blueText {}
redButton {}
style1 {}
```

Class names may describe state when useful:

```css
.isActive {}
.isCollapsed {}
.isSelected {}
.isDirty {}
```

In CSS Modules, prefer explicit class composition in JSX over complex global selectors.

## Global selector limits

Avoid `:global(...)` unless necessary for:

- Tiptap/ProseMirror internal classes.
- Browser-level styling that cannot be scoped.
- Third-party component internals that must be styled.

When using `:global`, keep it as narrow as possible and comment why it is necessary.

Good:

```css
.editor :global(.ProseMirror) {
  min-height: 100%;
  outline: none;
}
```

Avoid broad global leakage:

```css
:global(button) {
  border: none;
}
```

## Layout rules for Kohelet

Respect the product layout:

```text
StoryWorld / Work tree      Writing editor        Contextual panel
optional left navigation    center/focus area     temporary right support
```

Supported writing modes:

- Focus mode: editor gets the main available space.
- Context mode: editor can shrink to roughly half width and a contextual panel opens on the right.
- Left navigation tree: should be collapsible or compact when the writer needs focus.

Do not make panels visually louder than the manuscript.

The editor and manuscript surface should feel stable, calm and readable during long sessions.

## Component states to cover

When relevant, style these states:

```text
default
hover
active / pressed
focus-visible
selected / current
disabled
loading
empty
error
success
warning
dirty / unsaved
collapsed / expanded
```

Never remove outlines unless replacing them with an accessible `:focus-visible` style.

## Buttons and desktop-app behavior

Buttons should feel like desktop application controls, not marketing CTAs.

Rules:

- Use compact but comfortable heights.
- Avoid giant landing-page buttons inside app chrome.
- Use icons only when they clarify action.
- Keep destructive actions visually distinct.
- Use disabled states for unavailable actions.
- Toolbar buttons must support active/pressed state when applicable.

## Typography

Use design tokens for UI typography.

For the writing editor, prioritize long-form reading comfort. Do not force all manuscript text into monospace unless `DESIGN.md` explicitly says so.

UI chrome may use a clean sans-serif or system UI stack. Metadata/code-like labels may use monospace tokens if defined.

## JSX / TSX rules

Keep JSX readable:

- Use `styles.root`, `styles.header`, etc.
- Use a small existing className helper if the repo already has one.
- Do not add a dependency only to join class names unless approved.
- Avoid inline styles except for dynamic CSS variables or runtime measurements.

Acceptable inline style pattern:

```tsx
<section style={{ '--panel-width': `${width}px` } as React.CSSProperties}>
```

Prefer CSS Modules for everything else.

## i18n interaction

If the component renders visible UI text, also use the `i18n-ui` skill.

Do not hardcode labels such as:

```tsx
<button>Guardar</button>
```

Use existing translation helpers and add keys to `src/i18n/locales/es-AR.json`.

Brand names like `Kohelet` and `Sofer` may remain literal.

## Accessibility

Every UI component must preserve:

- readable contrast in light and dark themes
- visible keyboard focus
- sensible tab order
- accessible names for icon-only buttons
- comfortable click/tap targets
- non-color-only state communication when needed

## Do not

- Do not create global component CSS.
- Do not hardcode theme colors when tokens exist.
- Do not create one-off color palettes per component.
- Do not add shadows, gradients, or decoration that contradicts `DESIGN.md`.
- Do not let right/left panels compete visually with the editor.
- Do not introduce a UI component library unless explicitly approved.
- Do not mix storage, editor commands, export logic, and styling in the same component.

## Completion checklist

Before finishing a UI/CSS task:

1. Every styled component uses its homonymous `.module.css` file.
2. Component styles consume tokens where possible.
3. The component works in light and dark themes.
4. Visible text uses i18n keys.
5. Focus, disabled and selected states are handled where relevant.
6. Class names referenced in JSX exist in the CSS Module.
7. No accidental global CSS leakage was introduced.
8. Run or report the relevant checks:

```bash
pnpm run lint
pnpm run test
pnpm run build
```
