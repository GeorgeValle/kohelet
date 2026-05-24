# docs/codex-workflow.md — Kohelet

> Guía operativa para Codex Cloud, Codex local y agentes que trabajen sobre este repositorio.  
> Este documento explica cómo leer la documentación, qué skills usar y cómo cerrar tareas sin desordenar el proyecto.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado del documento:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Objetivo

Codex debe ayudar a construir Kohelet sin perder la dirección del producto.

Kohelet no es:

- un clon de Word,
- una app de notas genérica,
- un dashboard corporativo,
- una web app de marketing,
- un experimento visual sin estructura narrativa.

Kohelet es una aplicación de escritorio para escritores, centrada en:

```text
planificar → escribir → proteger → revisar → exportar
```

Jerarquía narrativa base:

```text
StoryWorld → Work → Part → Chapter → Scene
```

La escena es la unidad principal de escritura.

---

## 2. Orden de lectura recomendado

Antes de cambios grandes, leer en este orden:

1. `AGENTS.md`
2. `roadmap.md`
3. `project_requirements.md`
4. `DESIGN.md`
5. `docs/index.md`
6. documento específico de la tarea
7. skill correspondiente en `.agents/skills/`

Ejemplos:

```text
Tarea de UI:
AGENTS.md → project_requirements.md → DESIGN.md → docs/codex-workflow.md → .agents/skills/css-modules-ui/SKILL.md

Tarea de editor:
AGENTS.md → project_requirements.md → docs/editor-core.md → .agents/skills/rich-text-editor/SKILL.md

Tarea de storage:
AGENTS.md → project_requirements.md → docs/storage.md → .agents/skills/tauri-storage/SKILL.md

Tarea de i18n:
AGENTS.md → project_requirements.md → docs/i18n.md → .agents/skills/i18n-ui/SKILL.md
```

---

## 3. Qué documento manda en caso de conflicto

Prioridad conceptual:

1. `roadmap.md` define dirección de producto.
2. `project_requirements.md` define contrato técnico.
3. `DESIGN.md` define experiencia visual y UX.
4. `AGENTS.md` define reglas de trabajo de agentes.
5. `docs/decisions.md` registra decisiones tomadas.
6. `docs/task.md` registra avance operativo.
7. `docs/phases/*` registra historial por fase.

Si hay conflicto real:

- no resolverlo inventando,
- registrar el problema,
- proponer una actualización de docs,
- pedir o dejar marcada una decisión en `docs/decisions.md`.

---

## 4. Skills locales

Las skills viven en:

```text
.agents/skills/
```

Skills iniciales:

```text
css-modules-ui
rich-text-editor
tauri-storage
i18n-ui
testing-react
docs-maintenance
```

### 4.1. `css-modules-ui`

Usar cuando la tarea toque:

- React UI,
- layout,
- CSS Modules,
- tokens,
- estados visuales,
- modo claro/oscuro,
- panel contextual,
- árbol narrativo,
- componentes visuales.

Regla central:

```text
ComponentName.tsx → ComponentName.module.css
ComponentName.jsx → ComponentName.module.css
```

Global CSS permitido solo para:

```text
src/styles/tokens.css
src/styles/globals.css
```

### 4.2. `rich-text-editor`

Usar cuando la tarea toque:

- Tiptap,
- editor Sofer,
- toolbar,
- comandos,
- serialización,
- atajos,
- contenido rich-text,
- preservación de cursor/selección.

Regla central:

```text
El editor edita escenas, no documentos gigantes.
```

### 4.3. `tauri-storage`

Usar cuando la tarea toque:

- guardado local,
- apertura de proyectos,
- autoguardado,
- snapshots,
- recuperación,
- filesystem,
- migraciones,
- validación de integridad.

Regla central:

```text
No perder texto es prioridad máxima.
```

### 4.4. `i18n-ui`

Usar cuando la tarea toque:

- textos visibles,
- componentes UI,
- botones,
- labels,
- mensajes,
- estados vacíos,
- formularios,
- traducciones.

Regla central:

```text
Todo texto visible debe salir de src/i18n/locales/es-AR.json.
```

Excepciones:

```text
Kohelet
Sofer
```

### 4.5. `testing-react`

Usar cuando la tarea toque:

- Vitest,
- React Testing Library,
- smoke tests,
- tests de componentes,
- tests de modelos,
- validaciones,
- exportación,
- storage.

Regla central:

```text
Testear comportamiento importante, no detalles frágiles de implementación.
```

### 4.6. `docs-maintenance`

Usar cuando la tarea toque:

- documentación,
- cierre de fase,
- actualización de checklist,
- decisiones,
- cambios de alcance,
- cambios en arquitectura.

Regla central:

```text
Si cambia el proyecto, actualizar la documentación correspondiente.
```

---

## 5. Flujo recomendado para una tarea

### 5.1. Antes de tocar código

1. Leer el pedido.
2. Identificar el tipo de tarea.
3. Leer los documentos relevantes.
4. Activar o consultar la skill correspondiente.
5. Revisar si la tarea está dentro del alcance 1.0.
6. Revisar si toca módulos post-1.0.
7. Planificar cambios pequeños.

### 5.2. Durante la implementación

1. Hacer cambios acotados.
2. Evitar componentes gigantes.
3. Evitar mezclar UI, storage, editor y exportación en el mismo archivo.
4. Usar modelos tipados.
5. Usar tokens para estilos.
6. Usar i18n para textos visibles.
7. Agregar tests cuando corresponda.
8. No introducir dependencias nuevas sin necesidad clara.

### 5.3. Antes de cerrar

1. Ejecutar validaciones disponibles.
2. Actualizar `docs/task.md` si cambió avance.
3. Actualizar `docs/decisions.md` si hubo decisión relevante.
4. Actualizar `docs/phases/*` si se cerró o avanzó una fase.
5. Reportar archivos modificados.
6. Reportar comandos ejecutados y resultado.
7. Reportar limitaciones o pendientes.

---

## 6. Comandos esperados

Cuando existan scripts configurados:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Cuando aplique Tauri:

```bash
pnpm tauri build
```

En WSL, cuando corresponda usar Node desde nvm:

```bash
source ~/.nvm/nvm.sh && nvm use 24
```

Si un comando falla:

- no ocultar el error,
- explicar la causa probable,
- corregir si está dentro del alcance,
- si no se corrige, dejar pendiente claro.

---

## 7. Reglas de implementación

### 7.1. React y TypeScript

- Usar TypeScript.
- Evitar `any`.
- Usar `unknown` para contenido rich-text serializado cuando corresponda.
- Mantener componentes pequeños.
- Separar lógica de dominio, UI y persistencia.
- No crear componentes monolíticos que mezclen editor, storage, paneles y exportación.

### 7.2. CSS Modules

- Cada componente con estilos propios debe tener su homónimo `.module.css`.
- No usar `.css` global para componentes.
- Usar tokens de `src/styles/tokens.css`.
- No hardcodear colores si existe token.
- Mantener soporte light/dark/system.
- No eliminar focus visible.

Ejemplo correcto:

```text
RichTextToolbar.tsx
RichTextToolbar.module.css
```

### 7.3. i18n

- No hardcodear textos visibles.
- Usar claves en `src/i18n/locales/es-AR.json`.
- Mantener claves agrupadas por módulo.
- No usar textos en inglés para UI visible salvo marca, nombre técnico o placeholder temporal documentado.

### 7.4. Editor Sofer

- Sofer edita escenas.
- Guardar contenido como JSON estructurado.
- No usar el DOM visible como fuente de verdad.
- No desmontar editor al abrir/cerrar panel contextual.
- Preservar cursor y selección.
- Toolbar acotada.
- Exportación basada en contenido serializado.

### 7.5. Storage

- No guardar manuscrito principal en `localStorage`.
- `localStorage` puede guardar preferencias de UI.
- Guardado local debe tener estructura migrable.
- Autoguardado y snapshots son prioridad.
- Recuperación ante cierre inesperado debe planificarse temprano.

### 7.6. Exportación

- RTF es prioridad para 1.0.
- Exportar escenas en orden.
- No implementar DOCX/PDF avanzado sin aprobación explícita.
- No exportar datos internos salvo elección explícita del usuario.

---

## 8. Reglas de documentación

### 8.1. `docs/task.md`

Actualizar cuando:

- se completa una tarea,
- se inicia una fase,
- se cierra una fase,
- se mueve algo de 1.0 a post-1.0,
- se detecta bloqueo.

### 8.2. `docs/decisions.md`

Actualizar cuando:

- se toma una decisión de arquitectura,
- se define una tecnología,
- se cambia el modelo de datos,
- se cambia alcance,
- se descarta una alternativa importante.

### 8.3. `docs/phases/*`

Actualizar cuando:

- una fase recibe implementación,
- se cierra un bloque,
- se completa una milestone,
- se deja deuda técnica relevante.

### 8.4. `docs/index.md`

Actualizar cuando:

- se agrega un nuevo documento,
- se cambia el propósito de un documento,
- se reorganiza la carpeta `docs/`.

---

## 9. Módulos core hacia 1.0

Codex puede trabajar dentro de estos módulos sin pedir redefinición de alcance, siempre que la tarea esté alineada con la documentación:

```text
1. StoryWorld / Mundo narrativo
2. Work / Obra
3. Partes, capítulos y escenas
4. Núcleo narrativo
5. Editor Sofer
6. Panel contextual de escritura
7. Guardado, autoguardado, snapshots y recuperación
8. Personajes
9. Lugares
10. Trama y subtramas
11. Notas vinculadas
12. Exportación RTF
```

Módulos recomendables para 1.0 si no comprometen estabilidad:

```text
13. Referencias simples
14. Objetivos de palabras y progreso básico
15. Revisión básica por estado
16. Continuidad básica
17. Filtros por tipo/estado de escena
```

---

## 10. Módulos fuera de 1.0 salvo aprobación explícita

No implementar sin instrucción explícita:

```text
- Asistente IA
- Sincronización cloud
- Colaboración multiusuario
- Comentarios editoriales avanzados
- Control de cambios
- Exportación DOCX completa
- Exportación PDF avanzada
- Cronología avanzada
- Mapas visuales complejos
- Adjuntos pesados
- Análisis automático de ritmo
- Plantillas narrativas avanzadas
```

Puede dejarse el modelo preparado de forma mínima si `project_requirements.md` lo define, pero no implementar pantallas completas ni features avanzadas sin aprobación.

---

## 11. Flujo sugerido de PR o bloque de trabajo

### 11.1. Título

Usar títulos claros:

```text
feat: add narrative structure models
feat: create writing workspace layout
chore: initialize design tokens
test: add scene model validation tests
docs: update phase 01 foundation notes
```

### 11.2. Descripción mínima

Cada PR o bloque debería explicar:

```md
## What changed

## Why

## Files touched

## Validation

## Documentation updated

## Follow-up
```

### 11.3. Cierre

Antes de cerrar:

- actualizar checklist,
- registrar decisiones si aplica,
- validar comandos,
- no dejar documentación desactualizada.

---

## 12. Checklist rápido por tipo de tarea

### UI / CSS Modules

- [ ] Usó `css-modules-ui`.
- [ ] Leyó `DESIGN.md`.
- [ ] Creó `ComponentName.module.css`.
- [ ] Usó tokens.
- [ ] Funciona en modo claro y oscuro.
- [ ] No hardcodeó textos visibles.
- [ ] No eliminó focus visible.

### Editor

- [ ] Usó `rich-text-editor`.
- [ ] No desmonta editor innecesariamente.
- [ ] Preserva contenido serializado.
- [ ] No depende del DOM como fuente de verdad.
- [ ] Toolbar desacoplada.

### Storage

- [ ] Usó `tauri-storage`.
- [ ] No usa `localStorage` como fuente principal.
- [ ] Considera autoguardado.
- [ ] Considera snapshots.
- [ ] Considera recuperación.
- [ ] Considera migraciones.

### i18n

- [ ] Usó `i18n-ui`.
- [ ] Textos visibles en `es-AR.json`.
- [ ] Claves agrupadas por módulo.
- [ ] No hardcodeó labels/botones/mensajes.

### Testing

- [ ] Usó `testing-react`.
- [ ] Agregó tests relevantes.
- [ ] Evitó tests frágiles.
- [ ] Ejecutó tests disponibles.

### Docs

- [ ] Usó `docs-maintenance`.
- [ ] Actualizó `docs/task.md`.
- [ ] Actualizó `docs/decisions.md` si aplica.
- [ ] Actualizó `docs/phases/*` si aplica.

---

## 13. Anti-patrones

Codex debe evitar:

- crear una toolbar tipo Word completa,
- mezclar storage con componentes UI,
- crear CSS global para componentes,
- hardcodear colores y textos,
- agregar dependencias innecesarias,
- implementar features post-1.0 sin aprobación,
- borrar documentación para simplificar,
- crear pantallas visualmente bonitas pero sin conexión narrativa,
- convertir el panel contextual en dashboard permanente,
- perder el foco en escritura por exceso de módulos.

---

## 14. Criterio final para aceptar una feature

Antes de agregar una feature, debe responder al menos una pregunta:

```text
¿Ayuda a planificar mejor?
¿Ayuda a escribir con más foco?
¿Ayuda a no perder texto?
¿Ayuda a entender la historia?
¿Ayuda a exportar el manuscrito?
```

Si no responde ninguna, probablemente no pertenece al camino hacia 1.0.
