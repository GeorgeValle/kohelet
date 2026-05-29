# Phase 01 — Foundation

## Goal

Validate the minimal Tauri 2 + React + TypeScript + Vite foundation for Kohelet without adding editor, storage, export or full narrative-model behavior.

## Implemented

- Confirmed the minimal Tauri scaffold exists under `src-tauri/`: `Cargo.toml`, `build.rs`, `src/main.rs`, `tauri.conf.json` and `icons/`.
- Configured `bundle.icon` in `src-tauri/tauri.conf.json` to use only real icon assets currently present in `src-tauri/icons/`.
- Kept `icons/128x128@2x.png` intentionally omitted: it is not required, was not created and is not referenced.
- Added the missing `tauri:build` package script.

## Not implemented

The following remain intentionally out of scope for this foundation validation:

- Sofer editor implementation.
- Storage, autosave, snapshots or recovery.
- Export flows.
- Complete narrative domain models.
- CI.
- Generated, Base64 or bootstrapped icons.

## Validation

Attempted on 2026-05-29:

| Command | Result | Notes |
| --- | --- | --- |
| `pnpm install` | Blocked | The environment returned `ERR_PNPM_FETCH_403` while fetching `@eslint/js` from the npm registry; dependencies could not be installed. |
| `pnpm run lint` | Blocked | ESLint could not import `@eslint/js` because `pnpm install` did not complete. |
| `pnpm run test` | Blocked | `vitest` was not available because `pnpm install` did not complete. |
| `pnpm run build` | Blocked | TypeScript could not resolve React/Vite/Vitest packages because dependencies were not installed. |
| `pnpm run tauri:build` | Blocked | The `tauri` CLI was not available because dependencies were not installed. |

## Follow-up tasks

- Re-run `pnpm install` in an environment with npm registry access.
- Re-run `pnpm run lint`, `pnpm run test`, `pnpm run build` and `pnpm run tauri:build` after dependencies install successfully.
- Validate `pnpm run tauri:build` locally on Windows/WSL with native Tauri dependencies installed.
