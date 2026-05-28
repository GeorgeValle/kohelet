# Phase 00 — Repository Setup

## Goal

Create the clean technical starting point for Kohelet without reusing PR #1 or its commits, keeping the repository minimal, verifiable and aligned with the 1.0 scope.

## Implemented

- Added a minimal React + TypeScript + Vite scaffold managed with pnpm.
- Added required package scripts: `dev`, `build`, `lint`, `test`, `preview`, `tauri` and `tauri:dev`.
- Added a minimal Tauri 2 scaffold under `src-tauri/`.
- Kept `bundle.icon` empty and created `src-tauri/icons/.gitkeep` for future icon assets.
- Added a minimal `es-AR` i18n dictionary and a typed translation helper.
- Added minimal global design tokens and global CSS.
- Added a minimal app shell using CSS Modules and visible text from i18n, except brand names.
- Added a smoke test for the initial app shell without `@testing-library/jest-dom`.

## Not implemented

The following items are intentionally out of scope for this first technical commit:

- CI.
- Base64 icons or real icon assets.
- `pnpm tauri:build` or any Tauri bundle/build validation.
- Tiptap.
- Complete Sofer editor.
- Storage, autosave, snapshots or recovery.
- Export flows.
- Complete narrative domain models.

## Validation

Attempted on 2026-05-28:

| Command | Result | Notes |
| --- | --- | --- |
| `pnpm install` | Blocked | The environment returned `ERR_PNPM_FETCH_403` while fetching packages from the npm registry. |
| `pnpm run lint` | Blocked | `node_modules` is missing because install was blocked. |
| `pnpm run test` | Blocked | `vitest` is unavailable because install was blocked. |
| `pnpm run build` | Blocked | TypeScript/Vite dependencies are unavailable because install was blocked. |

No `pnpm run tauri:build` command was run for this task.

## Follow-up tasks

- Re-run `pnpm install` in an environment with registry access so pnpm can generate a valid `pnpm-lock.yaml`.
- Re-run `pnpm run lint`, `pnpm run test` and `pnpm run build` after dependencies install successfully.
