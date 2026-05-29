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

- GitHub Actions CI quedó verde para el flujo web de este PR con Node 22, `pnpm@10.28.1` y el registro público de npm.
- `pnpm install --no-frozen-lockfile --reporter=append-only` pasó en GitHub Actions; el proyecto todavía no tiene `pnpm-lock.yaml`, por lo que CI usa el fallback sin lockfile hasta que se commitee uno válido.
- `pnpm run lint` pasó en GitHub Actions.
- `pnpm run test` pasó en GitHub Actions.
- `pnpm run build` pasó en GitHub Actions.
- En el entorno local de Codex, `pnpm install` puede seguir fallando con `ERR_PNPM_FETCH_403` por el proxy del entorno; esa limitación local no cambia el estado verde confirmado en GitHub Actions.
- `pnpm run tauri:build` sigue pendiente fuera del workflow web actual.
