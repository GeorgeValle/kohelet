# Phase 05 — Storage and Recovery

## Goal

Protect the writer's text with local project files, validation, future migrations, autosave, snapshots and recovery without coupling Sofer or React components to filesystem details.

## Implemented

- Added the first domain model slice for `StoryWorld`, `Work`, `Part`, `Chapter`, `Scene` and `KoheletProjectFile`.
- Added `.kohelet` project file constants with `app: 'kohelet'` and schema version `1`.
- Added stable, readable JSON serialization and raw JSON parsing.
- Added minimal project validation for the project envelope, story world, works, scenes, scene content and `Scene.workId` integrity within its containing `Work`.
- Added typed storage errors for invalid schema, unsupported schema version, missing files, permission denials, read failures and write failures.
- Added a migration stub that accepts schema version `1` and rejects unsupported future versions.
- Added a pure `projectStorage` boundary for opening projects from text, preparing projects for save and delegating writes to an injected filesystem boundary.
- Added a Tauri TypeScript boundary for `openProjectFromPath` and `saveProjectToPath` that invokes Rust commands while reusing pure storage validation/serialization.
- Added Rust Tauri commands for reading project text and writing project text through a temporary-file safe-write flow.
- Added an initial project factory with one `StoryWorld`, one `Work` and one empty Sofer/Tiptap-compatible `Scene`.
- Added unit tests for serialization, parse/validation, invalid app, future schema version, missing scene content, mismatched containing `Scene.workId`, structured content roundtrip, typed validation errors, Tauri boundary mapping and factory validity.
- Added Rust tests for project file read and safe-write replacement helpers.

## Not implemented yet

- Full manual save/open UI.
- Autosave.
- Snapshots.
- Recovery UI and recovery decision flow.
- Save-state indicator wired to the editor.

## Decisions

- The first project file format is JSON with extension `.kohelet`.
- `Scene.content` remains structured editor JSON and is validated as serializable data.
- The storage services stay UI-free and editor-free; real filesystem access is isolated behind `tauriProjectFileStorage` and focused Rust commands.
- Future schema versions are rejected instead of being mutated or downgraded.

## Follow-up tasks

- Add final manual save/open UI and file picker on top of the boundary.
- Add snapshots before risky writes or future migrations.
- Add autosave and recovery as separate, tested modules.
- Surface typed storage errors through i18n UI messages when the save/open UI is introduced.

## Validation

- `pnpm run test -- src/lib/storage/projectStorage.test.ts src/lib/storage/tauriProjectFileStorage.test.ts` passed locally for the Block 10 storage tests.
- Rust command helper tests were added under `src-tauri/src/project_file_storage.rs`; full local `cargo test` may require Linux Tauri system packages such as `glib-2.0`.
- Full validation for the PR must run `pnpm run lint`, `pnpm run test`, `pnpm run build`, Rust/Tauri validation where the environment supports it, and `git diff --check`.
