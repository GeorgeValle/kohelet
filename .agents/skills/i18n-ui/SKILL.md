---
name: i18n-ui
description: Use when adding or editing visible UI text, labels, tooltips, placeholders, aria labels, validation messages, scene type labels, module names, menus, buttons, or translation keys in Kohelet. Do not use for internal-only constants with no user-visible text unless they map to UI labels.
---

# i18n UI Skill — Kohelet

Use this skill whenever a change adds, removes or edits visible UI text.

Kohelet's initial language is Spanish Argentina (`es-AR`), but the app must be prepared for future languages.

## Required reading

Before i18n changes, read:

1. `project_requirements.md`
2. `docs/i18n.md`, if it exists
3. `src/i18n/i18n.ts`, if it exists
4. `src/i18n/locales/es-AR.json`
5. The component using the translation key

## Main rule

Do not hardcode visible UI text in React components.

Avoid:

```tsx
<button>Guardar</button>
<label>Nombre del personaje</label>
<span>Sin escenas</span>
```

Use translation keys:

```tsx
<button>{t('actions.save')}</button>
<label>{t('character.fields.name')}</label>
<span>{t('scene.emptyState')}</span>
```

Brand names may remain literal:

```text
Kohelet
Sofer
```

## What counts as visible UI text

Use i18n for:

```text
buttons
menus
tabs
toolbar tooltips
form labels
placeholders
empty states
error messages
success messages
warning messages
aria labels for icon-only buttons
scene type labels
status labels
module names
panel titles
export dialog text
recovery dialog text
```

Internal enum values do not need translation by themselves, but displayed labels for those enum values do.

## Key structure

Prefer stable, semantic keys grouped by module.

Recommended namespaces:

```json
{
  "app": {},
  "actions": {},
  "navigation": {},
  "editor": {},
  "scene": {},
  "work": {},
  "storyWorld": {},
  "narrativeCore": {},
  "characters": {},
  "places": {},
  "plot": {},
  "notes": {},
  "references": {},
  "goals": {},
  "review": {},
  "storage": {},
  "export": {},
  "settings": {},
  "errors": {},
  "a11y": {}
}
```

## Scene labels

Scene type labels must be localized.

Expected keys:

```json
{
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

Scene statuses should also be localized:

```json
{
  "scene": {
    "status": {
      "planned": "Planificada",
      "draft": "Borrador",
      "revision": "En revisión",
      "final": "Final"
    }
  }
}
```

## Narrative structure labels

Use localized labels for:

```text
Mundo narrativo
Obra
Parte
Capítulo
Escena
Núcleo narrativo
Premisa dramática
Premisa de autor
Pregunta central
Tema principal
Conflicto central
Promesa narrativa
Resolución esperada
```

Recommended key area:

```json
{
  "narrativeCore": {
    "title": "Núcleo narrativo",
    "fields": {
      "dramaticPremise": "Premisa dramática",
      "authorPremise": "Premisa de autor",
      "centralQuestion": "Pregunta central"
    }
  }
}
```

## Interpolation

Do not concatenate translated strings manually.

Avoid:

```tsx
<span>{t('scene.countPrefix') + count + t('scene.countSuffix')}</span>
```

Prefer interpolation:

```tsx
<span>{t('scene.count', { count })}</span>
```

## Plurals

When counts are shown, use the project's i18n pluralization approach if available. If not yet configured, keep keys structured so pluralization can be added later.

## ARIA labels

Icon-only buttons need localized accessible names.

Example:

```tsx
<button aria-label={t('editor.toolbar.bold')}>
```

Do not leave icon-only buttons unlabeled.

## CSS Modules interaction

If adding UI text while also styling a component, use the `css-modules-ui` skill too.

Text decisions and visual decisions should remain consistent.

## Adding keys

When adding a new key:

1. Put it in the closest existing namespace.
2. Avoid duplicate keys with slightly different wording.
3. Use clear Spanish Argentina wording.
4. Keep terminology consistent with `DESIGN.md` and `project_requirements.md`.
5. Update tests or snapshots if they depend on text.

## Do not

- Do not hardcode visible Spanish text in components.
- Do not store UI labels as enum values only.
- Do not create many duplicate keys for the same action.
- Do not concatenate translated fragments to form sentences.
- Do not translate brand names `Kohelet` and `Sofer` unless explicitly requested.
- Do not add English visible text in the initial UI unless it is part of a technical value or brand name.

## Completion checklist

Before finishing an i18n task:

1. Every new visible text has a translation key.
2. `src/i18n/locales/es-AR.json` is valid JSON.
3. Keys are grouped by module and not duplicated unnecessarily.
4. Icon-only buttons have localized accessible labels.
5. Scene/work/story terminology is consistent.
6. Components do not hardcode labels/placeholders/tooltips.
7. Run or report:

```bash
pnpm run lint
pnpm run test
pnpm run build
```
