# docs/task.md — Kohelet

> Checklist vivo del proyecto. Este archivo resume qué debe ir quedando completo hacia la versión 1.0.  
> Debe actualizarse al cerrar cada bloque, PR, fase o decisión importante.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado del documento:** inicial  
**Última revisión:** 2026-05-29

---

## 1. Uso de este archivo

`docs/task.md` funciona como lista de avance operativa.

Debe servir para que Codex, Codex Cloud y cualquier agente puedan responder rápido:

- qué está pendiente,
- qué está en progreso,
- qué ya fue completado,
- qué queda fuera de 1.0,
- qué documentos deben actualizarse después de cada cambio.

Reglas:

- Mantener los ítems claros y accionables.
- Marcar con `[x]` solo cuando esté implementado, validado y documentado.
- No usar este archivo para reemplazar `roadmap.md`.
- No usar este archivo para reemplazar `project_requirements.md`.
- Si una tarea cambia el alcance, registrar también una decisión en `docs/decisions.md`.
- Si una tarea cierra una fase, actualizar el archivo correspondiente en `docs/phases/`.

Formato recomendado:

```md
- [ ] Pendiente
- [~] En progreso
- [x] Completado
- [!] Bloqueado o requiere decisión
```

> Nota: GitHub Markdown no reconoce `[~]` ni `[!]` como checkbox real, pero son útiles para lectura rápida. Si se prefiere compatibilidad visual total, usar solo `[ ]` y `[x]`.

---

## 2. Documentación inicial del repositorio

### 2.1. Archivos raíz

- [ ] Crear `README.md`.
- [ ] Crear `AGENTS.md`.
- [ ] Crear `DESIGN.md`.
- [ ] Crear `roadmap.md`.
- [ ] Crear `project_requirements.md`.
- [ ] Crear `LICENSE`.

### 2.2. Carpeta `docs/`

- [ ] Crear `docs/index.md`.
- [ ] Crear `docs/task.md`.
- [ ] Crear `docs/decisions.md`.
- [ ] Crear `docs/codex-workflow.md`.
- [ ] Crear `docs/architecture.md`.
- [ ] Crear `docs/data-model.md`.
- [ ] Crear `docs/editor-core.md`.
- [ ] Crear `docs/export.md`.
- [ ] Crear `docs/glossary.md`.
- [ ] Crear `docs/i18n.md`.
- [ ] Crear `docs/release.md`.
- [ ] Crear `docs/storage.md`.
- [ ] Crear `docs/testing.md`.

### 2.3. Carpeta `docs/phases/`

- [ ] Crear `docs/phases/phase-00-repository-setup.md`.
- [ ] Crear `docs/phases/phase-01-foundation.md`.
- [ ] Crear `docs/phases/phase-02-editor-core.md`.
- [ ] Crear `docs/phases/phase-03-narrative-structure.md`.
- [ ] Crear `docs/phases/phase-04-writing-modules.md`.
- [ ] Crear `docs/phases/phase-05-storage-recovery.md`.
- [ ] Crear `docs/phases/phase-06-export.md`.
- [ ] Crear `docs/phases/phase-07-polish-release.md`.

### 2.4. Skills del proyecto

- [ ] Crear `.agents/skills/css-modules-ui/SKILL.md`.
- [ ] Crear `.agents/skills/rich-text-editor/SKILL.md`.
- [ ] Crear `.agents/skills/tauri-storage/SKILL.md`.
- [ ] Crear `.agents/skills/i18n-ui/SKILL.md`.
- [ ] Crear `.agents/skills/testing-react/SKILL.md`.
- [ ] Crear `.agents/skills/docs-maintenance/SKILL.md`.

---

## 3. Fase 0 — Preparación del repositorio

Objetivo: dejar el repo listo para recibir implementación.

- [ ] Crear repo `kohelet` en GitHub.
- [ ] Clonar repo vacío en local.
- [ ] Agregar documentación base.
- [ ] Agregar skills locales del proyecto.
- [ ] Agregar licencia.
- [ ] Confirmar estructura inicial de carpetas.
- [ ] Hacer primer commit de documentación.
- [ ] Actualizar `docs/phases/phase-00-repository-setup.md`.

Commit sugerido:

```bash
git add .
git commit -m "chore: initialize project documentation and Codex skills"
```

---

## 4. Fase 1 — Foundation técnica

Objetivo: inicializar la app con stack base.

- [~] Inicializar Tauri 2 + React + TypeScript + Vite. Scaffold mínimo creado y `bundle.icon` configurado con iconos reales; validación completa bloqueada por `pnpm install` sin acceso al registro npm.
- [~] Configurar `pnpm` como package manager. Scripts requeridos agregados, incluido `tauri:build`; `pnpm-lock.yaml` queda pendiente porque `pnpm install` no pudo resolver dependencias por bloqueo de red.
- [x] Crear estructura base de `src/`.
- [x] Crear `src/styles/tokens.css`.
- [x] Crear `src/styles/globals.css`.
- [x] Configurar CSS Modules.
- [x] Configurar Vitest.
- [x] Configurar React Testing Library.
- [x] Configurar lint si aplica.
- [x] Crear `src/i18n/locales/es-AR.json`.
- [x] Crear carga inicial de i18n.
- [!] Validar `pnpm run build`. Intentado el 2026-05-28; falla porque `pnpm install` no pudo descargar dependencias desde el registro npm.
- [!] Validar `pnpm run test`. Intentado el 2026-05-28; falla porque `pnpm install` no pudo descargar dependencias desde el registro npm.
- [x] Actualizar `docs/phases/phase-01-foundation.md`.

### 4.1. Primer commit técnico limpio — 2026-05-28

- [x] Crear scripts requeridos: `dev`, `build`, `lint`, `test`, `preview`, `tauri`, `tauri:dev`.
- [x] Crear scaffold Tauri 2 mínimo sin iconos reales y con `bundle.icon` vacío.
- [x] Crear `src-tauri/icons/.gitkeep`.
- [x] Mantener fuera de alcance CI, Tiptap, Sofer completo, storage, exportación y modelos narrativos completos.
- [!] Ejecutar `pnpm install`. Resultado real: bloqueado por `ERR_PNPM_FETCH_403` al consultar el registro npm desde el entorno; no se pudo generar un `pnpm-lock.yaml` válido.
- [!] Ejecutar `pnpm run lint`, `pnpm run test` y `pnpm run build`. Resultado real: bloqueados porque `node_modules` no pudo instalarse.

### 4.2. Validación Tauri mínima con iconos reales — 2026-05-29

- [x] Confirmar scaffold Tauri mínimo: `src-tauri/Cargo.toml`, `src-tauri/build.rs`, `src-tauri/src/main.rs`, `src-tauri/tauri.conf.json` y `src-tauri/icons/`.
- [x] Confirmar iconos reales cargados: `src-tauri/icons/32x32.png`, `src-tauri/icons/128x128.png`, `src-tauri/icons/icon.icns` y `src-tauri/icons/icon.ico`.
- [x] Actualizar `src-tauri/tauri.conf.json` para que `bundle.icon` apunte solo a iconos reales existentes.
- [x] Omitir intencionalmente `src-tauri/icons/128x128@2x.png`; no es obligatorio, no fue creado y no debe referenciarse.
- [x] Agregar script `tauri:build` como `tauri build`.
- [!] Ejecutar `pnpm install`. Resultado real: bloqueado por `ERR_PNPM_FETCH_403` al consultar `@eslint/js` en el registro npm; no se pudo instalar dependencias ni generar `pnpm-lock.yaml`.
- [!] Ejecutar `pnpm run lint`. Resultado real: bloqueado porque ESLint no pudo importar `@eslint/js` tras fallar la instalación.
- [!] Ejecutar `pnpm run test`. Resultado real: bloqueado porque `vitest` no está disponible tras fallar la instalación.
- [!] Ejecutar `pnpm run build`. Resultado real: bloqueado porque TypeScript no puede resolver React/Vite/Vitest tras fallar la instalación.
- [!] Ejecutar `pnpm run tauri:build`. Resultado real: bloqueado porque el binario `tauri` no está disponible tras fallar la instalación.

---

## 5. Fase 2 — Editor Sofer

Objetivo: crear el editor base de escritura por escena.

- [ ] Instalar y configurar Tiptap.
- [ ] Crear `RichTextEditor.tsx`.
- [ ] Crear `RichTextEditor.module.css`.
- [ ] Crear `RichTextToolbar.tsx`.
- [ ] Crear `RichTextToolbar.module.css`.
- [ ] Crear `EditorShell.tsx`.
- [ ] Crear `EditorStatusBar.tsx`.
- [ ] Definir extensiones iniciales del editor.
- [ ] Crear comandos desacoplados en `lib/editor/`.
- [ ] Guardar contenido como JSON estructurado.
- [ ] Preservar cursor y selección al abrir/cerrar paneles.
- [ ] Evitar toolbar tipo Word completa.
- [ ] Crear tests mínimos del editor.
- [ ] Actualizar `docs/editor-core.md`.
- [ ] Actualizar `docs/phases/phase-02-editor-core.md`.

---

## 6. Fase 3 — Estructura narrativa

Objetivo: implementar el modelo narrativo base.

Jerarquía máxima:

```text
StoryWorld → Work → Part → Chapter → Scene
```

- [ ] Crear tipos de `StoryWorld`.
- [ ] Crear tipos de `Work`.
- [ ] Crear tipos de `Part`.
- [ ] Crear tipos de `Chapter`.
- [ ] Crear tipos de `Scene`.
- [ ] Crear `NarrativeCore`.
- [ ] Crear `SceneType`.
- [ ] Crear `SceneStatus`.
- [ ] Crear validaciones básicas del modelo.
- [ ] Crear árbol narrativo inicial.
- [ ] Permitir estructura para cuento corto.
- [ ] Permitir estructura para novela corta / novela.
- [ ] Permitir estructura para saga / trilogía / serie.
- [ ] Actualizar `docs/data-model.md`.
- [ ] Actualizar `docs/phases/phase-03-narrative-structure.md`.

---

## 7. Fase 4 — Layout de escritura y panel contextual

Objetivo: permitir escritura concentrada y consulta contextual temporal.

- [ ] Crear `WritingWorkspace.tsx`.
- [ ] Crear `WritingWorkspace.module.css`.
- [ ] Crear `ContextualLayout.tsx`.
- [ ] Crear `ContextualLayout.module.css`.
- [ ] Implementar modo concentración.
- [ ] Implementar modo contexto 50/50 aproximado.
- [ ] Crear panel contextual derecho.
- [ ] Crear panel izquierdo de árbol narrativo.
- [ ] Permitir ocultar paneles.
- [ ] Mantener editor montado al abrir/cerrar contexto.
- [ ] Usar tokens de `tokens.css`.
- [ ] Usar CSS Modules para componentes.
- [ ] Actualizar `DESIGN.md` si cambia el comportamiento visual.
- [ ] Actualizar `docs/phases/phase-03-narrative-structure.md` o crear nota en fase correspondiente.

---

## 8. Fase 5 — Módulos narrativos 1.0

Objetivo: crear módulos conectados a escenas, obras y mundo narrativo.

### 8.1. Core obligatorio

- [ ] Núcleo narrativo.
- [ ] Personajes.
- [ ] Lugares.
- [ ] Trama y subtramas.
- [ ] Notas vinculadas.

### 8.2. Recomendables para 1.0

- [ ] Referencias simples.
- [ ] Objetivos de palabras.
- [ ] Revisión básica por estado.
- [ ] Continuidad básica.
- [ ] Filtros por tipo de escena.
- [ ] Filtros por estado de escena.

### 8.3. Fuera de 1.0 salvo aprobación explícita

- [ ] Cronología avanzada.
- [ ] Glosario / lore avanzado.
- [ ] Mapa de relaciones entre personajes.
- [ ] Plantillas narrativas avanzadas.
- [ ] Asistente IA.
- [ ] Comentarios editoriales avanzados.
- [ ] Control de cambios.
- [ ] Adjuntos pesados.

---

## 9. Fase 6 — Storage, autoguardado y recuperación

Objetivo: proteger el texto del escritor.

- [ ] Crear estructura de proyecto local.
- [ ] Crear guardado local.
- [ ] Crear apertura de proyecto local.
- [ ] Implementar autoguardado configurable.
- [ ] Implementar snapshots periódicos.
- [ ] Implementar recuperación ante cierre inesperado.
- [ ] Crear indicador `Guardado / Sin guardar`.
- [ ] Crear validación básica de integridad.
- [ ] Preparar migraciones de estructura.
- [ ] Evitar `localStorage` como almacenamiento principal del manuscrito.
- [ ] Actualizar `docs/storage.md`.
- [ ] Actualizar `docs/phases/phase-05-storage-recovery.md`.

---

## 10. Fase 7 — Exportación

Objetivo: exportar manuscritos de forma confiable.

- [ ] Crear compilador de manuscrito desde escenas ordenadas.
- [ ] Exportar obra completa a RTF.
- [ ] Exportar parte a RTF.
- [ ] Exportar capítulo a RTF.
- [ ] Exportar escena a RTF.
- [ ] Evaluar TXT opcional.
- [ ] No implementar DOCX antes de 1.0 salvo aprobación.
- [ ] No implementar PDF avanzado antes de 1.0 salvo aprobación.
- [ ] Crear tests para compilación de manuscrito.
- [ ] Actualizar `docs/export.md`.
- [ ] Actualizar `docs/phases/phase-06-export.md`.

---

## 11. Fase 8 — Pulido y release 1.0

Objetivo: estabilizar la app para uso real.

- [ ] Revisar accesibilidad básica.
- [ ] Revisar modo claro.
- [ ] Revisar modo oscuro.
- [ ] Revisar preferencia `system`.
- [ ] Revisar i18n visible.
- [ ] Revisar textos hardcodeados.
- [ ] Revisar recuperación de proyecto.
- [ ] Revisar exportación RTF.
- [ ] Revisar build de escritorio.
- [ ] Crear checklist de release.
- [ ] Actualizar `docs/release.md`.
- [ ] Actualizar `docs/phases/phase-07-polish-release.md`.

---

## 12. Validaciones recurrentes

Antes de cerrar un bloque técnico, ejecutar cuando estén disponibles:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Si aplica Tauri:

```bash
pnpm tauri build
```

En WSL, cuando corresponda:

```bash
source ~/.nvm/nvm.sh && nvm use 24
```

---

## 13. Checklist para Codex antes de cerrar una tarea

- [ ] ¿Se respetó `roadmap.md`?
- [ ] ¿Se respetó `project_requirements.md`?
- [ ] ¿Se respetó `DESIGN.md` si hubo UI?
- [ ] ¿Se usó la skill correcta?
- [ ] ¿Se evitaron textos hardcodeados visibles?
- [ ] ¿Se usaron CSS Modules para componentes?
- [ ] ¿Se usaron tokens en vez de colores hardcodeados?
- [ ] ¿Se documentó la decisión si cambió el alcance?
- [ ] ¿Se actualizó `docs/task.md`?
- [ ] ¿Se actualizó el archivo de fase correspondiente?
- [ ] ¿Se reportaron comandos ejecutados y resultado?

---

## 14. Pendientes de definición

Registrar acá temas que aún requieren decisión.

- [ ] Nombre definitivo de la licencia.
- [ ] Profundidad inicial del módulo de continuidad.
- [ ] Formato exacto del archivo local del proyecto.
- [ ] Alcance final de objetivos de palabras para 1.0.
- [ ] Exportación TXT opcional.
- [ ] Convención final de nombres de rutas/componentes.
