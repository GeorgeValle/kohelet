# docs/glossary.md — Kohelet

> Glosario de términos del producto, del modelo narrativo y de la arquitectura.  
> Sirve para que Codex y colaboradores humanos usen nombres consistentes.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## A

### AGENTS.md

Archivo raíz con reglas de trabajo para Codex, Codex Cloud y otros agentes.

No debe contener todo el detalle técnico; debe apuntar a documentación específica.

### AppChrome

Componente de layout que representa el marco principal de la app: barras, shell, navegación principal y contenedores.

### Autoguardado

Sistema que guarda cambios de forma periódica o por eventos para reducir riesgo de pérdida de texto.

---

## C

### Chapter / Capítulo

Nivel narrativo opcional dentro de una `Work`.

Puede contener escenas y, si la obra usa partes, puede pertenecer a una `Part`.

### Codex Cloud

Agente de desarrollo que puede leer el repositorio, documentación y skills para implementar tareas.

### ContextPanel / Panel contextual

Panel derecho temporal que muestra información útil mientras el escritor escribe.

Puede mostrar escena, capítulo, parte, obra, mundo narrativo, núcleo narrativo, personajes, lugares, tramas, notas y referencias.

### CSS Modules

Estrategia de estilos encapsulados por componente.

Regla:

```text
ComponentName.tsx → ComponentName.module.css
```

### ContinuityNote / Nota de continuidad

Nota que ayuda a mantener coherencia entre escenas, obras o sagas.

Para 1.0 puede ser simple; continuidad avanzada queda post-1.0.

---

## D

### DESIGN.md

Documento raíz de diseño visual y UX.

Define tokens, temas, componentes, layout, CSS Modules, modo concentración, modo contexto y reglas visuales para Codex.

### Dramatic Premise / Premisa dramática

Concepto básico de la historia, generalmente formulado como “¿Qué pasaría si...?”.

Forma parte del `NarrativeCore`.

---

## E

### Editor Sofer

Módulo de escritura rich-text de Kohelet.

Usa Tiptap y edita escenas.

### Escena

Unidad principal y obligatoria de escritura.

En el modelo se llama `Scene`.

### Exportación

Proceso de convertir la obra, parte, capítulo o escena a un formato externo.

Para 1.0, el formato principal es RTF.

---

## I

### i18n

Internacionalización.

Kohelet inicia con `es-AR`, pero debe estar preparado para más idiomas.

Todo texto visible debe salir de `src/i18n/locales/es-AR.json`.

---

## K

### Kohelet

Nombre de la aplicación/proyecto.

Es una app de escritorio para escritores que ayuda a planificar, escribir, proteger, revisar y exportar obras narrativas.

---

## L

### Layout contextual

Modo de distribución donde el editor se reduce y aparece un panel derecho con información narrativa.

```text
[ Editor ] [ Panel contextual ]
```

### Lugar / PlaceCard

Ficha de lugar compartida a nivel `StoryWorld`, vinculable a obras y escenas.

---

## M

### Modo concentración

Modo de escritura donde Sofer ocupa el espacio principal y los paneles se reducen u ocultan.

### Modo contexto

Modo donde Sofer comparte espacio con el panel contextual derecho.

### Mundo narrativo

Traducción visible de `StoryWorld`.

Puede representar una obra independiente, trilogía, saga, serie o universo compartido.

---

## N

### NarrativeCore / Núcleo narrativo

Módulo que guarda el eje rector de una historia.

Campos:

- premisa dramática,
- premisa de autor,
- pregunta central,
- tema principal,
- conflicto central,
- promesa narrativa,
- resolución esperada,
- logline.

### Nota vinculada

Nota asociada a una entidad: mundo, obra, parte, capítulo, escena, personaje, lugar o trama.

---

## P

### Part / Parte

División grande opcional dentro de una obra.

Útil en novelas largas, sagas o estructuras extensas.

### Personaje / CharacterCard

Ficha de personaje compartida a nivel `StoryWorld`.

Puede vincularse a obras y escenas.

### PlotLine / Trama

Línea narrativa principal, subtrama o trama global.

Puede vincularse a obras y escenas.

### Project Requirements

`project_requirements.md`, contrato técnico estable de Kohelet.

### ProjectNote

Nota del proyecto vinculable a distintas entidades narrativas.

---

## R

### Recovery / Recuperación

Sistema que permite restaurar datos no guardados o recuperables tras cierre inesperado o error.

### ReferenceItem / Referencia

Elemento de investigación o fuente vinculable a obras y escenas.

### RTF

Formato principal de exportación para Kohelet 1.0.

---

## S

### Scene / Escena

Unidad principal de escritura.

Contiene metadata narrativa y `content` rich-text serializado.

### SceneStatus / Estado de escena

Estados iniciales:

```text
planned
draft
revision
final
```

Labels visibles:

```text
Planificada
Borrador
Revisión
Final
```

### SceneType / Tipo de escena

Tipos iniciales:

```text
conflict
revelation
decision
tension
transition
reaction
free
```

### Snapshot

Copia de seguridad local del proyecto en un momento determinado.

### Sofer

Nombre del editor de escritura dentro de Kohelet.

### StoryWorld

Contenedor narrativo superior.

Puede incluir una o varias obras y documentación compartida.

---

## T

### Tauri

Framework base para construir Kohelet como aplicación de escritorio.

### Tiptap

Motor rich-text usado por Sofer.

### Tokens CSS

Variables globales de diseño definidas en `src/styles/tokens.css`.

Ejemplos:

```text
--color-bg-app
--color-bg-surface
--color-text-primary
--radius-md
--space-md
```

---

## W

### Work / Obra

Una obra concreta dentro de un `StoryWorld`.

Puede ser cuento, novela corta, novela, libro de trilogía, volumen de saga, etc.

### WritingWorkspace

Componente principal del espacio de escritura.

Coordina árbol narrativo, editor Sofer y panel contextual.

---

## Reglas de nomenclatura

Nombres internos en inglés:

```text
StoryWorld
Work
Part
Chapter
Scene
NarrativeCore
CharacterCard
PlaceCard
PlotLine
ProjectNote
ReferenceItem
ContinuityNote
```

Labels visibles en español argentino:

```text
Mundo narrativo
Obra
Parte
Capítulo
Escena
Núcleo narrativo
Personaje
Lugar
Trama
Nota
Referencia
Continuidad
```

---

## Checklist para Codex

Al introducir un término nuevo:

- [ ] Verificar si ya existe en este glosario.
- [ ] Usar nombre interno consistente.
- [ ] Usar label visible desde i18n.
- [ ] Registrar el término si afecta modelo, UI o documentación.
- [ ] Evitar sinónimos innecesarios.
