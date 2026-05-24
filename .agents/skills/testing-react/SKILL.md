---
name: testing-react
description: Use when adding or updating tests for React components, Vitest, React Testing Library, model validation, editor serialization, storage utilities, i18n behavior, export compilation, or regression coverage in Kohelet. Do not use for pure documentation edits unless they describe test requirements.
---

# Testing React Skill — Kohelet

Use this skill when writing or updating tests for Kohelet.

Testing should protect the writer's text, the narrative model, editor behavior, i18n, and export/storage reliability.

## Required reading

Before test changes, read:

1. `project_requirements.md`
2. `docs/testing.md`, if it exists
3. Existing test setup files
4. Existing tests near the target code
5. The implementation files being tested

## Test stack

Kohelet uses:

```text
Vitest
React Testing Library
```

Do not introduce a different test runner without explicit approval.

## Testing philosophy

Prefer behavior and contract tests over brittle implementation tests.

Good tests answer:

```text
Can the writer create/navigate the structure?
Can the editor preserve content?
Can project data be saved/opened safely?
Can visible UI text resolve through i18n?
Can export compile scenes in order?
Can a migration preserve data?
```

Avoid tests that only assert private implementation details.

## Priority areas

High-priority coverage:

```text
StoryWorld / Work / Part / Chapter / Scene model validation
scene type/status handling
Narrative Core fields
editor empty document and serialization
word count utilities
storage save/open/migration/recovery behavior
export compilation order
RTF generation basics
i18n key usage for visible labels
contextual layout mode toggles
CSS Module class usage where behavior depends on state
```

## React Testing Library rules

Use user-facing queries when possible:

```ts
screen.getByRole('button', { name: /guardar/i })
screen.getByLabelText(/nombre/i)
screen.getByText(/sin escenas/i)
```

Prefer `userEvent` for interactions when available.

Avoid querying by class name unless absolutely necessary.

## i18n in tests

When testing components with visible text:

- Use the app's i18n provider/test helper if one exists.
- Do not hardcode implementation-only strings that should be translated.
- If tests become brittle due to translated text, prefer role/name queries that reflect real user accessibility.

## CSS Modules in tests

Do not assert CSS Module hashed class names.

It is fine to test behavior caused by state:

```text
selected item has aria-current
button has aria-pressed
panel is expanded/collapsed
```

Prefer semantic attributes over CSS assertions.

## Editor tests

For Sofer/Tiptap changes, prioritize:

- editor renders with empty valid content
- invalid content is handled safely
- toolbar buttons invoke commands
- content serialization round-trips
- word count works
- changing layout mode does not erase content

Mock heavy editor internals only when the test target is a wrapper component. Test utilities directly when possible.

## Storage tests

For storage changes, cover:

- valid project save/load
- invalid schema rejection
- unsupported future schema handling
- migration from old schema
- safe-write failure behavior where practical
- recovery detection
- snapshot retention policy

Use fake filesystems/mocks where feasible. Avoid writing to real user directories.

## Tauri tests/mocks

When frontend code calls Tauri commands:

- mock the Tauri invoke layer in unit tests
- test the TypeScript boundary contract
- do not require a real Tauri desktop runtime for normal unit tests

## Export tests

For export logic, cover:

- scenes compiled in order
- part/chapter/scene boundaries are preserved
- empty scenes are handled predictably
- internal notes are not exported unless explicitly selected
- RTF output contains expected structural markers without relying on excessive snapshots

## Snapshot tests

Use snapshots sparingly.

Allowed:

- small, stable serialized outputs
- compact RTF fragments if helpful

Avoid:

- large component tree snapshots
- snapshots that break on unrelated CSS Module hash changes
- full document snapshots for complex editor output

## Test file naming

Prefer colocated or nearby test files according to existing repo convention.

Common options:

```text
ComponentName.test.tsx
utilityName.test.ts
```

Keep tests focused and readable.

## Commands

Run or report:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

If a specific command does not exist yet, state that clearly and do not invent successful results.

## Do not

- Do not skip tests for storage/editor changes without explaining why.
- Do not assert private CSS Module hashes.
- Do not add flaky timeout-based tests.
- Do not introduce a new test runner without approval.
- Do not use snapshots as a replacement for behavior tests.
- Do not claim tests passed unless they actually ran.

## Completion checklist

Before finishing a test-related task:

1. Tests cover the changed behavior, not only implementation details.
2. Critical data-loss paths are protected when touched.
3. i18n-dependent UI remains testable.
4. Tauri calls are mocked appropriately.
5. Editor/storage/export tests avoid brittle snapshots.
6. Failed/missing commands are reported honestly.
7. Run or report:

```bash
pnpm run lint
pnpm run test
pnpm run build
```
