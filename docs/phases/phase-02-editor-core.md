# Phase 02 — Editor Core

## Goal

Crear el primer editor Sofer mínimo para escribir una escena activa con Tiptap, toolbar básica, serialización JSON y contador de palabras, sin adelantar storage real ni exportación.

## Implemented

- Dependencias declaradas para `@tiptap/react` y `@tiptap/starter-kit`.
- Layout inicial `WritingWorkspace` integrado en la app con Kohelet, Sofer y una escena mock activa.
- Componentes mínimos de editor: `EditorShell`, `RichTextEditor`, `RichTextToolbar` y `EditorStatusBar`, cada uno con CSS Module homónimo.
- Extensiones centralizadas en `src/lib/editor/editorExtensions.ts` con StarterKit.
- Comandos centralizados en `src/lib/editor/editorCommands.ts` para párrafo, título, negrita, cursiva, deshacer y rehacer.
- Serialización mínima en `src/lib/editor/editorSerialization.ts` con `emptyDoc`, `normalizeDoc` y `getEditorJson`.
- Conteo simple de palabras en `src/lib/writing/wordCount.ts`.
- Claves i18n iniciales para app, editor, toolbar, placeholder y status bar.
- Tests mínimos para conteo de palabras, serialización y render del workspace.

## Not implemented yet

- Storage real, autoguardado, snapshots y recuperación.
- Exportación RTF.
- Árbol real StoryWorld / Work / Part / Chapter / Scene.
- Panel contextual completo.
- Toolbar avanzada tipo Word.

## Validation

- `pnpm add @tiptap/react @tiptap/starter-kit` fue intentado, pero el registro npm respondió `ERR_PNPM_FETCH_403`; las dependencias quedaron declaradas manualmente en `package.json`.
- `pnpm install` fue intentado y falló por `ERR_PNPM_FETCH_403` al consultar el registro npm.
- `pnpm run lint` fue intentado y falló porque no pudo resolverse `@eslint/js` tras fallar la instalación.
- `pnpm run test` fue intentado y falló porque el binario `vitest` no está disponible tras fallar la instalación.
- `pnpm run build` fue intentado y falló porque faltan paquetes de Node, incluyendo React, Tiptap, Vite y Vitest.
- `pnpm run tauri:build` fue intentado y falló porque el binario `tauri` no está disponible tras fallar la instalación.
