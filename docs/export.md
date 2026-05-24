# docs/export.md — Kohelet

> Documento de exportación de manuscritos.  
> Define el alcance de RTF para 1.0, compilación de escenas, exportaciones opcionales y límites post-1.0.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Objetivo

Kohelet debe permitir que el escritor convierta su obra en un manuscrito exportable.

Exportación principal para 1.0:

```text
RTF
```

Exportación opcional simple:

```text
TXT
```

Post-1.0:

```text
DOCX
PDF avanzado
Plantillas editoriales avanzadas
```

---

## 2. Principio central

La exportación debe salir del modelo y del contenido serializado del editor, no del DOM visible.

```text
Scene.content JSON → compileManuscript → exportRtf / exportPlainText
```

Reglas:

- No exportar leyendo HTML renderizado si puede evitarse.
- No depender del estado visual del editor.
- Compilar escenas en orden según la estructura narrativa.
- Preservar estructura básica de partes, capítulos y escenas.

---

## 3. Ubicación de la lógica

```text
src/lib/export/
  compileManuscript.ts
  exportRtf.ts
  exportPlainText.ts
  exportTypes.ts
```

Responsabilidades:

- `compileManuscript.ts`: transformar obra/parte/capítulo/escenas en una representación lineal.
- `exportRtf.ts`: convertir la representación lineal a RTF.
- `exportPlainText.ts`: convertir la representación lineal a texto plano.
- `exportTypes.ts`: tipos compartidos de exportación.

La UI vive en:

```text
src/components/modals/ExportDialog.tsx
src/components/modals/ExportDialog.module.css
```

---

## 4. Alcance de exportación 1.0

Debe poder exportarse:

```text
Obra completa a RTF
Parte a RTF
Capítulo a RTF
Escena a RTF
```

Opcional:

```text
Obra completa a TXT
Capítulo a TXT
Escena a TXT
```

---

## 5. Estructura exportable

La exportación debe respetar el orden narrativo:

```text
Work
├── Part 1
│   ├── Chapter 1
│   │   ├── Scene 1
│   │   └── Scene 2
│   └── Chapter 2
└── Part 2
```

Para `scene_only`:

```text
Work
├── Scene 1
├── Scene 2
└── Scene 3
```

Para `chapters_and_scenes`:

```text
Work
├── Chapter 1
│   ├── Scene 1
│   └── Scene 2
└── Chapter 2
```

---

## 6. Representación intermedia

Tipo conceptual:

```ts
export type CompiledManuscript = {
  title: string;
  subtitle?: string;
  author?: string;
  blocks: ManuscriptBlock[];
};

export type ManuscriptBlock =
  | { type: 'work_title'; text: string }
  | { type: 'part_title'; text: string }
  | { type: 'chapter_title'; text: string }
  | { type: 'scene_title'; text: string }
  | { type: 'paragraph'; text: string; marks?: TextMark[] }
  | { type: 'separator' };

export type TextMark = 'bold' | 'italic' | 'underline';
```

La estructura final puede cambiar, pero debe existir una separación clara entre compilación y formato final.

---

## 7. Qué se exporta por defecto

Por defecto:

- título de obra,
- partes si existen,
- capítulos si existen,
- escenas en orden,
- texto del manuscrito.

Opcional según configuración:

- títulos de escenas,
- sinopsis,
- notas,
- tipo de escena,
- conteo de palabras,
- metadata narrativa.

Regla para 1.0:

```text
No exportar datos internos salvo que el usuario lo elija explícitamente.
```

---

## 8. RTF 1.0

RTF debe conservar estructura básica:

- títulos,
- párrafos,
- negrita,
- cursiva,
- subrayado si se implementa,
- saltos o separadores simples.

No hace falta para 1.0:

- maquetación editorial avanzada,
- estilos profesionales complejos,
- tablas,
- imágenes,
- notas al pie,
- índices,
- headers/footers avanzados.

---

## 9. TXT opcional

TXT puede ser útil como fallback.

Reglas:

- perderá formato rich-text,
- debe preservar orden y saltos básicos,
- debe ser simple y confiable.

---

## 10. Diálogo de exportación

`ExportDialog` debe permitir elegir:

```text
Qué exportar:
- obra completa
- parte
- capítulo
- escena

Formato:
- RTF
- TXT si está disponible

Opciones:
- incluir títulos de escena
- incluir separadores de escena
- incluir metadata narrativa, si se habilita
```

Todos los textos deben salir de i18n.

---

## 11. Validaciones antes de exportar

Antes de exportar:

- verificar que existe contenido,
- verificar que la estructura está ordenada,
- advertir si no hay escenas,
- manejar escenas vacías,
- manejar contenido corrupto sin romper toda la exportación.

---

## 12. Errores de exportación

La UI debe comunicar:

```text
No se pudo exportar.
La obra no tiene escenas.
El contenido de una escena no pudo convertirse.
El archivo fue exportado correctamente.
```

Los errores técnicos pueden registrarse internamente, pero el usuario debe recibir mensajes claros.

---

## 13. Testing de exportación

Tests prioritarios:

- compilar obra con escenas directas,
- compilar obra con capítulos,
- compilar obra con partes + capítulos,
- exportar párrafos simples a RTF,
- exportar negrita/cursiva si están soportadas,
- exportar TXT simple,
- manejar escena vacía,
- no exportar notas internas por defecto.

---

## 14. Fuera de alcance antes de 1.0

No implementar sin aprobación:

- DOCX completo,
- PDF avanzado,
- plantillas editoriales complejas,
- exportación con imágenes,
- comentarios editoriales,
- control de cambios,
- maquetación de imprenta.

---

## 15. Checklist para Codex

Antes de cerrar tarea de exportación:

- [ ] Se revisó `docs/export.md`.
- [ ] Se separó compilación de formato final.
- [ ] No se usó DOM visible como fuente de verdad.
- [ ] Se respetó orden `Part → Chapter → Scene`.
- [ ] RTF conserva estructura básica.
- [ ] Textos visibles están en i18n.
- [ ] Se agregaron tests de compilación/exportación.
- [ ] Se actualizó `docs/task.md`.
