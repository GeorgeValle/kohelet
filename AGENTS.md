# AGENTS.md — Kohelet

> Guía raíz para Codex Cloud, Codex local y agentes que trabajen sobre este repositorio.
> Mantener este archivo breve. El detalle técnico vive en `project_requirements.md`, `DESIGN.md` y `docs/`.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Tipo:** aplicación de escritorio para escritores  
**Stack base:** Tauri 2 + React + TypeScript + Vite + pnpm + Tiptap  
**Idioma inicial:** Español argentino (`es-AR`)

---

## 1. Regla principal

Kohelet es una app de escritorio para planificar, escribir, proteger, revisar y exportar obras narrativas.

La prioridad absoluta es:

```text
No perder texto del escritor.
```

Toda decisión debe respetar este orden:

1. proteger texto escrito;
2. mantener cierre/guardado confiable;
3. preservar foco de escritura;
4. respetar modelo narrativo;
5. mantener UI consistente;
6. validar con tests cuando corresponda.

---

## 2. Qué es Kohelet

Kohelet no debe convertirse en:

- un clon de Word;
- una app de notas genérica;
- un dashboard corporativo;
- una web marketing dentro de Tauri;
- una colección de paneles desconectados.

Kohelet debe organizar la escritura alrededor de:

```text
StoryWorld → Work → Part → Chapter → Scene
```

La escena es la unidad principal de escritura. El editor Sofer edita escenas, no un documento gigante completo.

---

## 3. Lectura obligatoria por tipo de tarea

Antes de tocar archivos, leer la documentación relevante.

### Siempre para cambios grandes

- `docs/index.md`
- `roadmap.md`
- `project_requirements.md`
- `docs/task.md`

### UI, layout, estilos o componentes

- `DESIGN.md`
- `docs/architecture.md`
- `.agents/skills/css-modules-ui/SKILL.md`

### Editor Sofer / Tiptap

- `docs/editor-core.md`
- `.agents/skills/rich-text-editor/SKILL.md`

### Storage, guardado, snapshots o recuperación

- `docs/storage.md`
- `docs/patron_cierre_nativo_y_recuperacion_borrador.md`
- `.agents/skills/tauri-storage/SKILL.md`

### Modelo narrativo o entidades

- `docs/data-model.md`
- `docs/decisions.md`

### i18n o textos visibles

- `docs/i18n.md`
- `.agents/skills/i18n-ui/SKILL.md`

### Exportación

- `docs/export.md`

### Tests

- `docs/testing.md`
- `.agents/skills/testing-react/SKILL.md`

### Release o versión

- `docs/release.md`

### Documentación viva

- `docs/codex-workflow.md`
- `.agents/skills/docs-maintenance/SKILL.md`

---

## 4. Codex skills

Las skills repo-scope viven en:

```text
.agents/skills/
```

Usarlas cuando aplique:

- `css-modules-ui`: React UI, CSS Modules, tokens, layout, light/dark mode y estados visuales.
- `rich-text-editor`: Tiptap, Sofer, toolbar, comandos, serialización y contenido de escenas.
- `tauri-storage`: archivos locales, guardado, autoguardado, snapshots, recovery y filesystem.
- `i18n-ui`: textos visibles, claves i18n y `src/i18n/locales/es-AR.json`.
- `testing-react`: Vitest, React Testing Library, smoke tests y validaciones.
- `docs-maintenance`: `docs/task.md`, `docs/phases/*`, `docs/decisions.md` y documentación viva.

Si una tarea toca varias áreas, usar todas las skills relevantes.

---

## 5. Reglas de implementación

### 5.1. Stack

- Usar `pnpm`, no `npm` ni `yarn`.
- Usar React + TypeScript.
- Usar Tauri 2 para escritorio.
- Usar Tiptap para editor rich-text.
- Evitar `any`; preferir tipos de dominio claros.
- Usar `unknown` para contenido rich-text serializado cuando corresponda.

### 5.2. CSS y diseño

- Componentes visuales usan CSS Modules.
- Cada componente con estilos propios debe tener archivo homónimo:

```text
ComponentName.tsx → ComponentName.module.css
ComponentName.jsx → ComponentName.module.css
```

- CSS global solo para:

```text
src/styles/tokens.css
src/styles/globals.css
```

- No hardcodear colores, spacing, radius ni tipografía si existe token.
- Los CSS Modules deben consumir variables de `tokens.css`.
- Mantener soporte para tema claro, oscuro y `system`.
- No crear `.css` globales nuevos para estilos de componentes.

### 5.3. i18n

- Todo texto visible de UI debe salir de `src/i18n/locales/es-AR.json`.
- Excepciones permitidas: nombres de marca como `Kohelet` y `Sofer`.
- No hardcodear labels, placeholders, mensajes, tooltips ni botones visibles.

### 5.4. Editor Sofer

- El editor guarda contenido estructurado, no depende del DOM visible como fuente de verdad.
- El contenido se guarda por escena.
- La toolbar debe estar desacoplada del editor.
- No implementar una toolbar tipo Word completa antes de 1.0.
- Al abrir/cerrar panel contextual, no desmontar el editor ni perder cursor/selección.

### 5.5. Storage y cierre de ventana

- No interceptar la X nativa de la ventana salvo aprobación explícita.
- El cierre nativo de Tauri/Windows debe funcionar siempre.
- Proteger cambios con guardado/autoguardado/snapshots/recuperación.
- Confirmar acciones internas destructivas como `Nuevo` o `Abrir` cuando haya cambios pendientes.
- Evitar drafts obsoletos: al limpiar borrador, limpiar storage, timer y snapshot en memoria.
- No usar `localStorage` como almacenamiento principal del manuscrito completo.
- `localStorage` puede usarse para preferencias UI o borradores/recovery pequeños si está documentado.

### 5.6. Modelo narrativo

- Mantener la jerarquía máxima:

```text
StoryWorld → Work → Part → Chapter → Scene
```

- `StoryWorld` puede contener una obra independiente, trilogía, saga, serie, antología o universo compartido.
- `Work` contiene el manuscrito concreto.
- `Part` y `Chapter` son opcionales según tipo de obra.
- `Scene` es obligatoria como unidad principal.
- La documentación compartida de saga vive en `StoryWorld`.

### 5.7. Módulos 1.0

Core 1.0:

- StoryWorld / Mundo narrativo;
- Work / Obra;
- Partes, capítulos y escenas;
- Núcleo narrativo;
- Editor Sofer;
- panel contextual;
- guardado, autoguardado, snapshots y recuperación;
- personajes;
- lugares;
- trama y subtramas;
- notas vinculadas;
- exportación RTF.

No introducir módulos post-1.0 sin aprobación explícita.

### 5.8. Estilo de mensaje en cada Commit 

cuando sugieran o creen commits, usar este formato

```text
(type): short description in English

```
 Ejemplos preferidos:

```
(feat): add initial writing workspace layout
(docs): add Kohelet documentation boilerplate
(chore): initialize project structure
(fix): correct editor autosave recovery flow
(test): add storage recovery tests
(refactor): split editor toolbar commands
(style): polish contextual panel layout
```
 Reglas:

- Use lowercase commit types.
- Use English commit messages.
- Keep the message short and imperative.
- Prefer feat for user-facing functionality.
- Prefer docs for documentation-only changes.
- Prefer chore for repository setup, tooling, dependencies or structure.
- Prefer fix for bug fixes.
- Prefer test for test-only changes.
- Prefer refactor for internal code changes that do not change behavior.
- Prefer style for CSS, layout or visual polish that does not change logic.
- Do not create vague commits such as update files, changes, fix stuff or wip.

---

## 6. Validaciones esperadas

Cuando el repo ya tenga scripts disponibles, usar:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Si se toca Tauri, validar también el flujo de escritorio correspondiente.

Si una validación no puede ejecutarse, reportar:

- comando intentado;
- motivo;
- riesgo;
- qué queda pendiente.

---

## 7. Documentación viva

Actualizar documentación cuando cambie comportamiento, alcance o decisiones.

- `docs/task.md`: tareas completadas, pendientes y validaciones.
- `docs/decisions.md`: decisiones relevantes y consecuencias.
- `docs/phases/*`: qué se implementó por fase.
- `docs/index.md`: si se agrega, renombra o elimina documentación importante.

No inflar `AGENTS.md` con detalles que pertenecen a documentos específicos.

---

## 8. Flujo de trabajo esperado

Antes de implementar:

1. identificar tipo de tarea;
2. leer documentos relevantes;
3. activar/usar skills relevantes;
4. revisar archivos existentes;
5. proponer cambios mínimos y coherentes.

Durante la implementación:

- mantener componentes pequeños;
- separar UI, modelo, storage, editor y exportación;
- no introducir dependencias nuevas sin motivo claro;
- no cambiar alcance 1.0 sin registrar decisión;
- preservar i18n, CSS Modules y tokens.

Al finalizar:

- ejecutar validaciones disponibles;
- actualizar docs si aplica;
- resumir archivos modificados;
- mencionar riesgos o pendientes reales.

---

## 9. Anti-patrones

Evitar:

- componentes gigantes que mezclen editor, storage, exportación y UI;
- estilos globales que pisen componentes;
- texto visible hardcodeado;
- colores directos en componentes;
- interceptar cierre nativo de ventana;
- usar el DOM como fuente de exportación;
- convertir Sofer en Word;
- meter módulos post-1.0 sin aprobación;
- ocultar errores de guardado;
- crear documentación duplicada o contradictoria.

---

## 10. Pregunta final antes de agregar una feature

Antes de agregar algo, validar si responde al menos una de estas preguntas:

```text
¿Ayuda a planificar mejor?
¿Ayuda a escribir con más foco?
¿Ayuda a no perder texto?
¿Ayuda a entender la historia?
¿Ayuda a exportar el manuscrito?
```

Si no responde ninguna, probablemente no pertenece al camino hacia 1.0.
