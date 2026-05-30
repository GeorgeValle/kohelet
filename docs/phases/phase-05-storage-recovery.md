# Phase 05 — Storage and Recovery

## Goal

Protect the writer's text with local project files, validation, future migrations, autosave, snapshots and recovery without coupling Sofer or React components to filesystem details.

## Implemented

- Added the first domain model slice for `StoryWorld`, `Work`, `Part`, `Chapter`, `Scene` and `KoheletProjectFile`.
- Added `.kohelet` project file constants with `app: 'kohelet'` and schema version `1`.
- Added stable, readable JSON serialization and raw JSON parsing.
- Added minimal project validation for the project envelope, story world, works, scenes, scene content and `Scene.workId` references.
- Added typed storage errors for invalid schema, unsupported schema version, read failures and write failures.
- Added a migration stub that accepts schema version `1` and rejects unsupported future versions.
- Added a pure `projectStorage` boundary for opening projects from text, preparing projects for save and delegating writes to an injected filesystem boundary.
- Added an initial project factory with one `StoryWorld`, one `Work` and one empty Sofer/Tiptap-compatible `Scene`.
- Added unit tests for serialization, parse/validation, invalid app, future schema version, missing scene content, structured content roundtrip, typed validation errors and factory validity.

## Not implemented yet

- Real Tauri filesystem commands.
- Safe write with temporary file and replacement on disk.
- Full manual save/open UI.
- Autosave.
- Snapshots.
- Recovery UI and recovery decision flow.
- Save-state indicator wired to the editor.

## Decisions

- The first project file format is JSON with extension `.kohelet`.
- `Scene.content` remains structured editor JSON and is validated as serializable data.
- The first storage service stays UI-free and editor-free; real filesystem access must be injected through a small boundary.
- Future schema versions are rejected instead of being mutated or downgraded.

## Follow-up tasks

- Implement the Tauri 2 filesystem boundary for open/save.
- Add safe-write behavior using a temporary file and replace/rename strategy where supported.
- Add snapshots before risky writes or future migrations.
- Add autosave and recovery as separate, tested modules.
- Surface typed storage errors through i18n UI messages when the save/open UI is introduced.

## Validation

- `pnpm run test -- src/lib/storage/projectStorage.test.ts` passed locally for the initial storage test set.
- Full validation for the PR must run `pnpm install --frozen-lockfile --reporter=append-only`, `pnpm run lint`, `pnpm run test`, `pnpm run build` and `git diff --check`.
