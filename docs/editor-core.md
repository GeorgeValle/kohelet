# docs/editor-core.md — Kohelet

> Documento del editor Sofer.  
> Define el alcance del editor rich-text, sus componentes, comandos, serialización, toolbar y reglas para mantener foco narrativo sin convertir Kohelet en un clon de Word.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** primer editor mínimo implementado  
**Última revisión:** 2026-05-29

---

## 1. Objetivo

Sofer es el módulo de escritura de Kohelet.

Debe permitir escribir escenas con una experiencia cómoda, sobria y persistente.

Regla principal:

```text
Sofer edita escenas, no un documento gigante completo.
```

El editor debe integrarse con:

- estructura narrativa,
- panel contextual,
- guardado/autoguardado,
- snapshots,
- exportación,
- conteo de palabras,
- i18n,
- temas claro/oscuro.

---

## 2. Motor del editor

Motor previsto:

```text
Tiptap
```

Reglas:

- Guardar contenido como JSON estructurado.
- No usar el DOM visible como fuente de verdad.
- Exportar desde el modelo serializado.
- Mantener toolbar y comandos desacoplados.
- No agregar extensiones que no puedan persistirse/exportarse correctamente.

---

## 3. Responsabilidades por carpeta

```text
src/components/editor/
→ UI del editor, toolbar, shell, status bar.

src/lib/editor/
→ extensiones, comandos, serialización, shortcuts, normalización.

src/lib/writing/
→ conteo de palabras, estados, tipos de escena, metas.
```

Componentes iniciales:

```text
RichTextEditor.tsx
RichTextEditor.module.css
RichTextToolbar.tsx
RichTextToolbar.module.css
EditorShell.tsx
EditorShell.module.css
EditorStatusBar.tsx
EditorStatusBar.module.css
```

Cada componente visual debe tener su `.module.css` homónimo.

---

## 4. Contenido por escena

Cada `Scene` contiene:

```ts
content: unknown;
```

Ese contenido representa JSON de Tiptap.

Reglas:

- La escena activa carga su contenido en Sofer.
- Al editar, se actualiza el contenido serializado de la escena.
- El autoguardado debe operar sobre el proyecto completo o una representación segura del estado.
- Cambiar de escena no debe perder cambios pendientes.

---

## 5. Extensiones iniciales permitidas

Extensiones sugeridas para 1.0:

```text
Document
Paragraph
Text
Bold
Italic
Underline si no complica exportación
Heading simple
BulletList básica si no complica exportación
OrderedList básica si no complica exportación
History
HardBreak
```

Opcional temprano:

```text
Placeholder
CharacterCount / word count propio
```

Evitar antes de 1.0 sin aprobación:

```text
Tablas avanzadas
Imágenes embebidas
Comentarios editoriales
Control de cambios
Colaboración en tiempo real
Markdown shortcuts complejos
Embeds externos
Adjuntos pesados
```

---

## 6. Toolbar inicial

Acciones iniciales:

```text
Negrita
Cursiva
Subrayado si entra temprano
Párrafo
Título simple
Lista básica si no complica exportación
Separador de escena si se define como elemento exportable
Deshacer
Rehacer
```

Reglas:

- No toolbar tipo Word completa.
- No llenar la UI de botones decorativos.
- Cada botón debe tener label i18n y `aria-label`.
- Los botones deben consumir tokens CSS.
- Los botones deben funcionar en modo claro y oscuro.

---

## 7. Comandos del editor

Archivo sugerido:

```text
src/lib/editor/editorCommands.ts
```

Los comandos deben estar separados de los componentes.

Ejemplo conceptual:

```ts
export function toggleBold(editor: Editor | null) {
  if (!editor) return;
  editor.chain().focus().toggleBold().run();
}
```

Reglas:

- Los componentes invocan comandos.
- Los comandos no importan CSS.
- Los comandos no conocen storage.
- Los comandos deben manejar `editor === null`.

---

## 8. Serialización

Archivo sugerido:

```text
src/lib/editor/editorSerialization.ts
```

Responsabilidades:

- crear contenido vacío válido,
- validar contenido serializado,
- normalizar contenido si falta estructura mínima,
- preparar contenido para exportación.

Reglas:

- No asumir que el contenido siempre viene perfecto.
- Proteger apertura de proyectos viejos o corruptos.
- No perder texto durante normalización.

---

## 9. Estado del editor

Estados visibles:

```text
Guardado
Sin guardar
Guardando
Error de guardado
Recuperado desde snapshot
Solo lectura si aplica
```

La UI puede mostrar estos estados en `EditorStatusBar`.

Reglas:

- No ocultar errores de guardado.
- No bloquear escritura por operaciones no críticas.
- Priorizar recuperación de contenido.

---

## 10. Modo concentración y modo contexto

Sofer debe funcionar en dos layouts:

```text
Modo concentración:
[ Editor amplio ]

Modo contexto:
[ Editor 50-60% ] [ Panel contextual 40-50% ]
```

Reglas técnicas:

- El editor no debe desmontarse al abrir/cerrar el panel contextual.
- El cursor debe preservarse.
- La selección debe preservarse si es razonable.
- El scroll no debe saltar innecesariamente.
- El panel contextual no debe robar foco salvo acción explícita.

---

## 11. Integración con panel contextual

El panel contextual puede mostrar:

```text
Escena actual
Tipo de escena
Objetivo
Conflicto
Resultado
Capítulo
Parte
Obra
Mundo narrativo
Núcleo narrativo
Personajes vinculados
Lugares vinculados
Tramas vinculadas
Notas
Referencias
Continuidad
```

Sofer no debe depender internamente del panel. Ambos se coordinan mediante estado de layout y escena activa.

---

## 12. Conteo de palabras

Archivo sugerido:

```text
src/lib/writing/wordCount.ts
```

Requisitos:

- contar palabras de la escena activa,
- permitir total por capítulo/parte/obra mediante compilación de escenas,
- excluir markup del editor,
- mantener rendimiento aceptable.

---

## 13. i18n del editor

Todo texto visible debe salir de:

```text
src/i18n/locales/es-AR.json
```

Ejemplos de claves:

```json
{
  "editor": {
    "toolbar": {
      "bold": "Negrita",
      "italic": "Cursiva",
      "undo": "Deshacer",
      "redo": "Rehacer"
    },
    "status": {
      "saved": "Guardado",
      "unsaved": "Sin guardar",
      "saving": "Guardando..."
    }
  }
}
```

---

## 14. Accesibilidad

Requisitos:

- botones con `aria-label`,
- foco visible,
- contraste correcto en ambos temas,
- estados disabled claros,
- navegación básica por teclado,
- no eliminar outline sin reemplazo accesible.

---

## 15. Testing del editor

Prioridades:

- render del editor vacío,
- render de toolbar,
- comandos básicos no fallan con editor nulo,
- serialización de contenido vacío,
- serialización de contenido con texto,
- labels i18n presentes,
- cambio de modo contexto no desmonta shell del editor si se puede testear.

Herramientas:

```text
Vitest
React Testing Library
```

---

## 16. Fuera de alcance antes de 1.0

No implementar sin aprobación explícita:

- colaboración en tiempo real,
- IA asistente,
- comentarios editoriales avanzados,
- control de cambios,
- imágenes embebidas complejas,
- tablas avanzadas,
- exportación DOCX completa,
- maquetación PDF avanzada.

---

## 17. Checklist para Codex

Antes de cerrar cambios en Sofer:

- [ ] Se usó la skill `rich-text-editor`.
- [ ] Componentes visuales tienen `.module.css` homónimo.
- [ ] No hay textos visibles hardcodeados.
- [ ] Los comandos están desacoplados.
- [ ] El contenido se serializa como JSON.
- [ ] El editor no se acopló a storage directamente.
- [ ] El editor no se desmonta por abrir/cerrar panel contextual.
- [ ] Se agregaron o actualizaron tests mínimos.
- [ ] Se actualizó `docs/task.md` si corresponde.
---

## 18. Implementación mínima actual — 2026-05-29

El primer Sofer mínimo monta Tiptap con StarterKit para una escena mock activa. La integración actual cubre solo escritura básica en memoria:

- `EditorShell` coordina instancia del editor, toolbar, superficie editable y status bar.
- `RichTextToolbar` muestra únicamente párrafo, título, negrita, cursiva, deshacer y rehacer.
- `editorCommands.ts` centraliza los comandos invocados desde la toolbar.
- `editorExtensions.ts` centraliza StarterKit.
- `editorSerialization.ts` define `emptyDoc`, `normalizeDoc` y `getEditorJson` para tratar el contenido como JSON estructurado.
- `wordCount.ts` cuenta palabras a partir del texto del editor.

Sigue fuera de alcance para esta implementación: storage real, autosave, snapshots, recuperación, exportación y modelo narrativo persistente completo.

