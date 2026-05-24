---
name: tauri-storage
description: Use when implementing or modifying Tauri 2 filesystem access, project save/open flows, autosave, snapshots, recovery, migrations, project file schema, local paths, backup logic, or storage tests in Kohelet. Do not use for pure UI styling or editor toolbar changes unless persistence is involved.
---

# Tauri Storage Skill — Kohelet

Use this skill when working on local storage, project files, autosave, snapshots, recovery, migrations, Tauri filesystem commands, or data integrity.

Priority zero: Kohelet must not lose the writer's text.

## Required reading

Before storage changes, read:

1. `project_requirements.md`
2. `docs/storage.md`, if it exists
3. `docs/data-model.md`, if it exists
4. Existing files under `src/lib/storage/`
5. Existing Tauri command files under `src-tauri/`
6. `docs/decisions.md` for storage decisions
7. `src/lib/model/` files for current schema

## Storage principles

Kohelet is a desktop writing app. Manuscript data must be stored in local project files, not only in browser memory.

Rules:

- Do not use `localStorage` as primary manuscript storage.
- `localStorage` may store UI preferences only, such as theme or layout widths.
- Use explicit project save/open flows.
- Support autosave without blocking typing.
- Support snapshots/backups.
- Support recovery after unexpected shutdown.
- Include schema versioning for future migrations.

## Data ownership

The storage layer persists the app domain model:

```text
StoryWorld → Work → Part → Chapter → Scene
```

Shared saga documentation lives at `StoryWorld` level.

Manuscript content lives in `Scene.content`.

Do not flatten the project into a single unstructured text blob.

## Suggested source layout

Use or create focused modules:

```text
src/lib/storage/projectStorage.ts
src/lib/storage/autosaveStorage.ts
src/lib/storage/snapshotStorage.ts
src/lib/storage/recoveryStorage.ts
src/lib/storage/migrations.ts
src/lib/storage/storageErrors.ts
```

For Tauri commands, keep Rust commands focused and documented under `src-tauri/`.

Do not mix storage implementation inside React components.

## Project file schema

Use a schema envelope so migrations are possible.

Recommended shape:

```ts
export type KoheletProjectFile = {
  schemaVersion: number;
  appVersion?: string;
  savedAt: string;
  storyWorld: StoryWorld;
};
```

Always preserve IDs, ordering and timestamps where possible.

## Safe write strategy

Use a safe write pattern for project files:

1. Serialize and validate payload.
2. Write to a temporary file.
3. Flush/close if supported.
4. Rename/move temporary file into final location.
5. Keep previous snapshot or backup.
6. Report errors clearly.

Do not overwrite the only good copy without a recovery path.

## Autosave

Autosave should be:

- debounced or throttled
- non-blocking for typing
- visible through saved/unsaved state
- recoverable if interrupted
- scoped to the active project

Autosave must not create unbounded files forever. If snapshots are created, apply a retention policy.

## Snapshots and recovery

Snapshots should protect against:

```text
crash during writing
bad save
corrupted project file
accidental destructive edits
unexpected app close
```

Recovery flow should:

- detect newer autosave/recovery data
- show a clear choice to restore or discard
- never silently overwrite user content
- preserve recovery payload until the user confirms resolution

## Migrations

Every project file should include `schemaVersion`.

Migration rules:

- Migrations are explicit functions from version N to N+1.
- Do not mutate unknown future schema versions.
- Do not discard unknown fields unless documented.
- Add tests for migrations.
- Keep migrations in `src/lib/storage/migrations.ts` or equivalent.

## Error handling

Storage functions should return typed errors or throw well-defined errors handled at the boundary.

Good categories:

```text
file_not_found
permission_denied
invalid_schema
unsupported_schema_version
write_failed
read_failed
migration_failed
recovery_available
```

Do not swallow storage errors.

## Tauri boundaries

Tauri commands should be small and safe.

Preferred split:

```text
React/UI → TS storage service → Tauri command → filesystem
```

Avoid direct filesystem assumptions in components.

Keep permissions explicit in Tauri config.

## UI preferences

UI preferences may be stored separately from manuscript data:

```text
theme preference
panel widths
last opened project path
collapsed navigation state
```

These can use a lightweight preference store. They are not the source of truth for manuscript text.

## Testing

Use the `testing-react` skill for validation strategy.

Storage tests should cover:

- saving valid project file
- opening valid project file
- rejecting invalid schema
- migration from old schema
- autosave debounce behavior where feasible
- snapshot retention
- recovery detection
- safe write failure behavior

Use mocks/fakes for filesystem where appropriate. Do not require real user directories for unit tests.

## Do not

- Do not store manuscript text only in `localStorage`.
- Do not keep all project state only in React memory.
- Do not overwrite project files without safe-write/recovery consideration.
- Do not silently ignore corrupted project data.
- Do not put filesystem logic inside UI components.
- Do not add cloud sync before explicit approval.
- Do not add collaboration/multiuser storage before post-1.0 planning.

## Completion checklist

Before finishing a storage task:

1. Manuscript data has a durable local persistence path.
2. Project schema/versioning is respected.
3. Save/open behavior is separated from UI components.
4. Autosave/snapshot/recovery implications are considered.
5. Errors are surfaced instead of swallowed.
6. Tests or migration checks are added where relevant.
7. Documentation updates are made if schema/storage behavior changes.
8. Run or report:

```bash
pnpm run lint
pnpm run test
pnpm run build
```
