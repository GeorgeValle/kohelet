# docs/task.md — Kohelet

> Checklist vivo del proyecto. Este archivo resume qué debe ir quedando completo hacia la versión 1.0.  
> Debe actualizarse al cerrar cada bloque, PR, fase o decisión importante.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado del documento:** inicial  
**Última revisión:** 2026-05-30

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

- [~] Inicializar Tauri 2 + React + TypeScript + Vite. Scaffold mínimo creado y `bundle.icon` configurado con iconos reales; validación web pasó en GitHub Actions, mientras que la validación Tauri de escritorio sigue pendiente.
- [x] Configurar `pnpm` como package manager. Scripts requeridos agregados, incluido `tauri:build`; `package.json` declara el `packageManager` real usado por el proyecto (`pnpm@10.28.1`), `pnpm-lock.yaml` ya fue generado y mergeado, y CI instala con lockfile congelado.
- [x] Crear estructura base de `src/`.
- [x] Crear `src/styles/tokens.css`.
- [x] Crear `src/styles/globals.css`.
- [x] Configurar CSS Modules.
- [x] Configurar Vitest.
- [x] Configurar React Testing Library.
- [x] Configurar lint si aplica.
- [x] Crear `src/i18n/locales/es-AR.json`.
- [x] Crear carga inicial de i18n.
- [x] Validar `pnpm run build`. Resultado real: pasó en GitHub Actions.
- [x] Validar `pnpm run test`. Resultado real: pasó en GitHub Actions.
- [x] Actualizar `docs/phases/phase-01-foundation.md`.

### 4.1. Primer commit técnico limpio — 2026-05-28

- [x] Crear scripts requeridos: `dev`, `build`, `lint`, `test`, `preview`, `tauri`, `tauri:dev`.
- [x] Crear scaffold Tauri 2 mínimo sin iconos reales y con `bundle.icon` vacío.
- [x] Crear `src-tauri/icons/.gitkeep`.
- [x] Mantener fuera de alcance CI, Tiptap, Sofer completo, storage, exportación y modelos narrativos completos.
- [x] Ejecutar `pnpm install`. Resultado real: pasó en GitHub Actions con `--no-frozen-lockfile`; el entorno local de Codex sigue bloqueado por `ERR_PNPM_FETCH_403` y no se generó un `pnpm-lock.yaml` válido.
- [x] Ejecutar `pnpm run lint`, `pnpm run test` y `pnpm run build`. Resultado real: pasaron en GitHub Actions.

### 4.2. Validación Tauri mínima con iconos reales — 2026-05-29

- [x] Confirmar scaffold Tauri mínimo: `src-tauri/Cargo.toml`, `src-tauri/build.rs`, `src-tauri/src/main.rs`, `src-tauri/tauri.conf.json` y `src-tauri/icons/`.
- [x] Confirmar iconos reales cargados: `src-tauri/icons/32x32.png`, `src-tauri/icons/128x128.png`, `src-tauri/icons/icon.icns` y `src-tauri/icons/icon.ico`.
- [x] Actualizar `src-tauri/tauri.conf.json` para que `bundle.icon` apunte solo a iconos reales existentes.
- [x] Omitir intencionalmente `src-tauri/icons/128x128@2x.png`; no es obligatorio, no fue creado y no debe referenciarse.
- [x] Agregar script `tauri:build` como `tauri build`.
- [x] Ejecutar `pnpm install --no-frozen-lockfile --reporter=append-only` en GitHub Actions. Resultado real: pasó en CI con `pnpm@10.28.1` y registro público de npm; el entorno local de Codex siguió bloqueado por `ERR_PNPM_FETCH_403`, por lo que no se generó `pnpm-lock.yaml` localmente.
- [x] Ejecutar `pnpm run lint` en GitHub Actions. Resultado real: pasó en CI.
- [x] Ejecutar `pnpm run test` en GitHub Actions. Resultado real: pasó en CI.
- [x] Ejecutar `pnpm run build` en GitHub Actions. Resultado real: pasó en CI.
- [!] Ejecutar `pnpm run tauri:build`. Resultado real local: bloqueado porque el binario `tauri` no está disponible tras fallar la instalación local; no forma parte del workflow web actual.
- [x] Investigar instalación de dependencias: no hay `pnpm-lock.yaml`, el registro efectivo es `https://registry.npmjs.org/`, el entorno local de Codex devuelve 403 desde el proxy configurado antes de llegar al registro npm, y GitHub Actions sí pudo instalar dependencias desde el registro público.
- [x] Agregar `.npmrc` explícito para usar npm público sin tokens de autenticación del proyecto, con `always-auth=false`, `auto-install-peers=true` y `strict-peer-dependencies=false`.
- [x] Revertir `packageManager` a la versión real usada por `package.json`, `pnpm@10.28.1`, para mantener la línea base previa y separar cualquier cambio mayor de pnpm del PR de Sofer.
- [x] Simplificar `.github/workflows/ci.yml` como único workflow de CI con Node 22, diagnóstico mínimo de entorno, instalación pnpm con fallback sin lockfile y validaciones `lint`, `test` y `build`.
- [x] Mantener un único workflow `.github/workflows/ci.yml` para diagnosticar configuración de registry e instalación con pnpm 10 desde GitHub Actions, sin `cache: pnpm` hasta commitear `pnpm-lock.yaml`.
- [x] Confirmar GitHub Actions CI verde para `pnpm install --no-frozen-lockfile --reporter=append-only`, `pnpm run lint`, `pnpm run test` y `pnpm run build`.
- [x] Documentar diagnóstico de instalación en `docs/dependency-installation.md`.
- [x] Generar y commitear `pnpm-lock.yaml` desde un entorno con acceso válido al registro npm; CI ahora usa `--frozen-lockfile` fijo.

### 4.3. Línea base formal de instalación — 2026-05-29

- [x] Confirmar `packageManager` como `pnpm@10.28.1`; no se actualiza a pnpm 11 en esta deuda técnica.
- [x] Confirmar `.npmrc` con registro público de npm, `always-auth=false`, `auto-install-peers=true` y `strict-peer-dependencies=false`, sin GitHub Packages ni tokens.
- [x] Confirmar `.github/workflows/ci.yml` con Node 22, `pnpm/action-setup@v4`, instalación condicional según lockfile y validaciones `lint`, `test` y `build` como línea base previa al lockfile.
- [x] Registrar que CI web pasó en GitHub Actions para `pnpm install --no-frozen-lockfile --reporter=append-only`, `pnpm run lint`, `pnpm run test` y `pnpm run build`.
- [!] Intentar `pnpm install` en Codex Cloud. Resultado real local: falló con `ERR_PNPM_FETCH_403`; no se generó `pnpm-lock.yaml` y no se fuerza desde este entorno.
- [x] Crear workflow manual `Generate pnpm lockfile` para generar `pnpm-lock.yaml` desde GitHub Actions con Node 22, pnpm 10 y una PR automática dedicada.
- [x] Ejecutar el workflow manual para generar y commitear `pnpm-lock.yaml`; después, cambiar CI a `--frozen-lockfile` fijo y habilitar `cache: pnpm` en una PR posterior.
- [!] Ejecutar `pnpm run tauri:build`. Sigue pendiente porque no forma parte del workflow web validado y la instalación local quedó bloqueada por `ERR_PNPM_FETCH_403`.

### 4.4. Endurecimiento de instalación con lockfile — 2026-05-30

- [x] Confirmar que `pnpm-lock.yaml` ya fue generado y mergeado en `main`.
- [x] Cambiar `.github/workflows/ci.yml` para instalar siempre con `pnpm install --frozen-lockfile --reporter=append-only`.
- [x] Habilitar `cache: pnpm` en `actions/setup-node@v4` manteniendo Node 22.
- [x] Mantener `pnpm/action-setup@v4` y las validaciones `pnpm run lint`, `pnpm run test` y `pnpm run build`.
- [x] Mantener `.github/workflows/generate-lockfile.yml` como workflow manual para regenerar `pnpm-lock.yaml` cuando cambien dependencias.
- [x] Documentar en `docs/dependency-installation.md` que CI falla si `package.json` y `pnpm-lock.yaml` divergen.
- [x] Registrar resultados locales de `pnpm install --frozen-lockfile --reporter=append-only`, `pnpm run lint`, `pnpm run test`, `pnpm run build` y `git diff --check` para esta PR: todos pasaron; `pnpm run build` emitió solo la advertencia existente de chunk grande de Vite.

---

## 5. Fase 2 — Editor Sofer

Objetivo: crear el editor base de escritura por escena.

- [x] Instalar y configurar Tiptap. Dependencias declaradas; instalación validada en GitHub Actions, aunque el entorno local de Codex sigue bloqueado por `ERR_PNPM_FETCH_403`.
- [x] Crear `RichTextEditor.tsx`.
- [x] Crear `RichTextEditor.module.css`.
- [x] Crear `RichTextToolbar.tsx`.
- [x] Crear `RichTextToolbar.module.css`.
- [x] Crear `EditorShell.tsx`.
- [x] Crear `EditorStatusBar.tsx`.
- [x] Definir extensiones iniciales del editor.
- [x] Crear comandos desacoplados en `lib/editor/`.
- [x] Tratar contenido como JSON estructurado con helpers mínimos; storage real sigue fuera de alcance.
- [ ] Preservar cursor y selección al abrir/cerrar paneles.
- [x] Evitar toolbar tipo Word completa.
- [x] Crear tests mínimos del editor.
- [x] Actualizar `docs/editor-core.md`.
- [x] Actualizar `docs/phases/phase-02-editor-core.md`.

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

- [x] Crear `WritingWorkspace.tsx`.
- [x] Crear `WritingWorkspace.module.css`.
- [ ] Crear `ContextualLayout.tsx`.
- [ ] Crear `ContextualLayout.module.css`.
- [ ] Implementar modo concentración.
- [ ] Implementar modo contexto 50/50 aproximado.
- [ ] Crear panel contextual derecho.
- [ ] Crear panel izquierdo de árbol narrativo.
- [ ] Permitir ocultar paneles.
- [ ] Mantener editor montado al abrir/cerrar contexto.
- [x] Usar tokens de `tokens.css`.
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
