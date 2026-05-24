# Roadmap — Kohelet

**Proyecto:** Kohelet  
**Tipo:** Aplicación de escritorio para planificación y escritura narrativa  
**Editor / módulo de escritura:** Sofer  
**Stack base:** Tauri 2 + React + TypeScript + Vite + pnpm + Tiptap  
**Documento:** Roadmap estratégico de producto  
**Última revisión:** 2026-05-23

---

## 1. Visión del producto

Kohelet es una aplicación de escritorio para escritores que combina planificación narrativa, escritura por escenas, documentación compartida y exportación de manuscritos.

La app no debe nacer como un clon de Word ni como una simple hoja en blanco. Su objetivo principal es acompañar el proceso real de escritura narrativa:

1. Definir el mundo narrativo o proyecto general.
2. Crear una obra individual o varias obras dentro de una saga, trilogía, serie o universo compartido.
3. Planificar la estructura narrativa: partes, capítulos y escenas.
4. Definir el núcleo narrativo: premisa dramática, tesis, conflicto central, pregunta central y promesa narrativa.
5. Escribir escena por escena con foco.
6. Consultar contexto narrativo cuando sea necesario sin abandonar el editor.
7. Proteger el trabajo con guardado, autoguardado, snapshots y recuperación.
8. Exportar el manuscrito en formatos útiles para escritores.

Idea central:

> Kohelet ayuda al escritor a construir la obra antes de escribirla, y luego le permite escribir cada escena apoyándose en esa planificación.

---

## 2. Principios de decisión

Las decisiones de producto, arquitectura y diseño deben seguir este orden de prioridad:

1. **No perder texto.**  
   Guardado, autoguardado, recuperación y snapshots tienen prioridad sobre cualquier mejora visual.

2. **Planificar antes de escribir.**  
   El escritor debe poder crear la estructura narrativa y los módulos de apoyo antes de redactar.

3. **La escena es la unidad principal de escritura.**  
   El editor trabaja sobre escenas. Las escenas se organizan dentro de capítulos, partes y obras.

4. **Soportar obras independientes y proyectos mayores.**  
   La app debe contemplar cuentos, novelas cortas, novelas ligeras, novelas largas, trilogías, sagas, series y universos compartidos.

5. **Escribir con foco.**  
   La interfaz debe priorizar concentración, legibilidad, poco ruido visual y acceso rápido al contexto.

6. **Contexto cuando el escritor lo necesita.**  
   El panel contextual debe abrirse temporalmente para consultar escena, capítulo, parte, obra, personajes, lugares, trama, continuidad o mundo narrativo.

7. **Módulos conectados, no decorativos.**  
   Personajes, lugares, tramas, notas, referencias, premisas y objetivos deben conectarse con escenas, capítulos, obras o mundo narrativo.

8. **Exportación útil para escritores.**  
   RTF será la exportación principal inicial. PDF y DOCX quedan como evolución posterior.

---

## 3. Jerarquía narrativa del producto

Kohelet debe organizar la escritura con una jerarquía flexible:

```text
StoryWorld / Mundo narrativo
└── Work / Obra / Libro
    └── Part / Parte
        └── Chapter / Capítulo
            └── Scene / Escena
```

### 3.1. StoryWorld / Mundo narrativo

Es el contenedor superior. Puede representar:

- una obra independiente,
- una trilogía,
- una saga,
- una serie,
- una antología,
- un universo compartido,
- un proyecto narrativo personalizado.

La documentación compartida vive en este nivel.

Ejemplos:

```text
Mundo narrativo
├── Personajes compartidos
├── Lugares compartidos
├── Cronología general
├── Lore / reglas del mundo
├── Tramas globales
├── Notas de continuidad
└── Obras
    ├── Libro 1
    ├── Libro 2
    └── Libro 3
```

### 3.2. Work / Obra

Es el contenedor de un manuscrito concreto. Puede ser:

- cuento corto,
- novela corta,
- novela ligera,
- novela,
- novela larga,
- volumen de una saga,
- libro de una trilogía,
- obra personalizada.

### 3.3. Part / Parte

División mayor dentro de una obra. Es opcional.

Debe usarse principalmente para novelas medianas/largas, sagas o estructuras narrativas extensas.

### 3.4. Chapter / Capítulo

Agrupa escenas. Es opcional según el tipo de obra.

Un cuento corto puede funcionar sin capítulos. Una novela normalmente sí los usará.

### 3.5. Scene / Escena

Unidad principal y obligatoria de escritura.

La escena contiene:

- título,
- contenido rich-text,
- tipo de escena,
- estado,
- sinopsis,
- objetivo,
- conflicto,
- resultado,
- personaje POV,
- lugar,
- personajes involucrados,
- tramas vinculadas,
- notas.

---

## 4. Tipos de obra contemplados

Kohelet debe permitir seleccionar o adaptar el tipo de proyecto narrativo:

```text
- Cuento corto
- Novela corta
- Novela ligera
- Novela
- Novela larga
- Trilogía
- Saga
- Serie
- Antología
- Universo compartido
- Personalizado
```

La app no debe obligar a usar todos los niveles de estructura. La jerarquía debe adaptarse:

```text
Cuento corto
└── Escenas

Novela corta
└── Capítulos
    └── Escenas

Novela / novela larga
└── Partes
    └── Capítulos
        └── Escenas

Saga / trilogía
└── Obras
    └── Partes
        └── Capítulos
            └── Escenas
```

---

## 5. Núcleo narrativo

Kohelet debe incluir un módulo de **Núcleo narrativo**.

Este módulo no debe tratarse como una nota genérica, porque funciona como eje rector de la obra.

Debe poder existir en dos niveles:

```text
Mundo narrativo / saga
└── Núcleo narrativo global

Obra / libro
└── Núcleo narrativo de obra
```

### 5.1. Campos recomendados

```text
- Premisa dramática
- Premisa de autor / tesis
- Pregunta central
- Tema principal
- Conflicto central
- Promesa narrativa
- Dirección esperada de resolución
- Logline opcional
```

### 5.2. Premisa dramática

Resume la idea inicial de la historia. Puede formularse como:

```text
¿Qué pasaría si...?
```

### 5.3. Premisa de autor / tesis

Expresa el punto de vista filosófico, emocional o moral que la obra pone a prueba.

Ejemplo:

```text
El amor ciego y apasionado conduce inevitablemente a la tragedia.
```

### 5.4. Relación con escenas

Cada escena debería poder revisarse contra el núcleo narrativo:

```text
¿Esta escena empuja la premisa?
¿Refuerza o contradice la tesis?
¿Hace avanzar el conflicto central?
¿Cumple la promesa narrativa?
```

---

## 6. Tipos de escena

Cada escena puede clasificarse por función narrativa.

Tipos base para 1.0:

```text
- Conflicto
- Revelación
- Decisión
- Tensión / Suspenso
- Transición
- Reacción
- Libre / personalizado
```

### 6.1. Definiciones

- **Conflicto:** personajes chocan directamente por intereses opuestos.
- **Revelación:** aporta información nueva o crucial que cambia el rumbo de la trama o la perspectiva del lector.
- **Decisión:** muestra al protagonista o personaje clave sopesando opciones y tomando un camino difícil.
- **Tensión / Suspenso:** acelera el ritmo, aumenta peligro o incertidumbre y mantiene expectativa.
- **Transición:** conecta eventos principales, cambios de lugar o paso del tiempo de forma rápida.
- **Reacción:** permite procesar emocionalmente un evento traumático, revelador o impactante.
- **Libre:** permite una etiqueta personalizada definida por el escritor.

### 6.2. Uso de los tipos de escena

El tipo de escena debe servir para:

- filtrar escenas,
- revisar ritmo narrativo,
- visualizar la composición de capítulos,
- alimentar el panel contextual,
- detectar exceso de transiciones, falta de reacción o acumulación de conflicto sin pausa.

El análisis avanzado de ritmo puede quedar post-1.0, pero el campo debe existir desde el modelo base.

---

## 7. Layout de escritura

Kohelet debe contemplar dos modos principales de trabajo.

### 7.1. Modo concentración

El editor Sofer ocupa el espacio principal disponible.

```text
┌──────────────────────────────────────────────┐
│ Editor de escena                             │
│                                              │
│ Texto de la escena...                        │
│                                              │
└──────────────────────────────────────────────┘
```

### 7.2. Modo contexto

El editor se reduce aproximadamente a la mitad y aparece un panel contextual a la derecha.

```text
┌──────────────────────────┬──────────────────────────┐
│ Editor de escena          │ Panel contextual          │
│                           │                          │
│ Texto...                  │ Escena actual             │
│                           │ Capítulo                  │
│                           │ Parte                     │
│                           │ Obra                      │
│                           │ Mundo narrativo           │
└──────────────────────────┴──────────────────────────┘
```

El panel contextual debe poder cerrarse rápidamente para volver al modo concentración.

### 7.3. Reglas UX

- Abrir el panel contextual no debe desmontar el editor.
- El cursor, selección y estado de edición deben preservarse.
- El panel contextual debe ser temporal, no una pantalla que interrumpa la escritura.
- La app no debe obligar al escritor a navegar fuera de la escena para consultar información relacionada.

---

## 8. Módulos previstos hasta 1.0

Los módulos de 1.0 deben priorizar escritura, planificación, seguridad y exportación. Ningún módulo debe ser puramente decorativo.

### 8.1. Core obligatorio para 1.0

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

### 8.2. Recomendable para 1.0 si entra dentro del alcance

```text
13. Referencias simples
14. Objetivos de palabras y progreso básico
15. Revisión básica por estado
16. Continuidad básica
17. Filtros por tipo/estado de escena
```

### 8.3. Post-1.0

```text
- Cronología avanzada
- Continuidad avanzada
- Glosario / lore avanzado
- Mapa de relaciones entre personajes
- Plantillas narrativas avanzadas
- Exportación DOCX
- Exportación PDF avanzada
- Asistente IA
- Comentarios editoriales
- Control de cambios
- Adjuntos pesados
- Estadísticas narrativas avanzadas
- Análisis automático de ritmo
- Sincronización cloud
- Colaboración multiusuario
```

---

## 9. Módulos 1.0 en detalle

### 9.1. Estructura narrativa

Debe permitir crear, editar y navegar:

```text
Mundo narrativo → Obra → Parte → Capítulo → Escena
```

Reglas:

- `Scene` es obligatoria.
- `Work` es obligatoria para contener texto.
- `Part` y `Chapter` son opcionales según tipo de obra.
- `StoryWorld` puede representar una obra independiente o una saga.

### 9.2. Editor Sofer

Debe permitir escribir rich-text por escena.

Alcance inicial:

```text
- Párrafos
- Títulos simples
- Negrita
- Cursiva
- Subrayado si se implementa temprano
- Listas básicas si no complican exportación
- Separador de escena
- Contador de palabras
- Estado de guardado
```

### 9.3. Panel contextual

Debe mostrar información relacionada con la escena activa:

```text
- Escena actual
- Capítulo actual
- Parte actual
- Obra actual
- Mundo narrativo
- Núcleo narrativo
- Personajes vinculados
- Lugares vinculados
- Tramas vinculadas
- Notas
- Referencias
- Objetivos
- Continuidad básica
```

### 9.4. Personajes

Debe permitir crear fichas de personaje y vincularlas con escenas/obras.

Campos iniciales:

```text
- Nombre
- Rol
- Descripción
- Motivación
- Conflicto interno / externo
- Notas
- Escenas donde aparece
- Obras donde aparece
```

### 9.5. Lugares

Debe permitir crear fichas de lugares y vincularlas con escenas/obras.

Campos iniciales:

```text
- Nombre
- Descripción
- Notas
- Escenas relacionadas
- Obras relacionadas
```

### 9.6. Trama y subtramas

Debe permitir registrar líneas narrativas conectadas a escenas.

Campos iniciales:

```text
- Título
- Descripción
- Tipo: principal / subtrama / global
- Estado
- Escenas vinculadas
- Obra relacionada
- Mundo narrativo relacionado
```

### 9.7. Notas

Las notas deben poder vincularse a distintos niveles:

```text
- Mundo narrativo
- Obra
- Parte
- Capítulo
- Escena
- Personaje
- Lugar
- Trama
```

### 9.8. Referencias

Para 1.0 deben ser simples:

```text
- Título
- Descripción o fragmento
- Link opcional
- Relación con escena/obra/mundo narrativo
```

No incluir gestor documental pesado en 1.0.

### 9.9. Objetivos

Debe permitir metas básicas:

```text
- Meta de palabras por escena
- Meta de palabras por capítulo
- Meta de palabras por obra
- Progreso básico
```

### 9.10. Revisión básica

Debe permitir estados simples:

```text
- Planificada
- Borrador
- Revisión
- Final
```

No incluir control de cambios ni comentarios editoriales en 1.0.

### 9.11. Exportación

Exportación principal inicial:

```text
- RTF
```

Debe permitir exportar:

```text
- Obra completa
- Parte
- Capítulo
- Escena
```

TXT puede ser secundario. DOCX y PDF quedan post-1.0 salvo que el alcance lo permita sin riesgo.

---

## 10. Roadmap por versiones

## 0.1.0 — Fundación técnica y documentación base

Objetivo: crear la base real del proyecto y dejar el repo preparado para Codex.

Incluye:

```text
- Crear app Tauri 2 + React + TypeScript + Vite + pnpm
- Configurar estructura inicial del repo
- Crear AGENTS.md
- Crear DESIGN.md
- Crear project_requirements.md
- Crear docs/index.md
- Crear docs/decisions.md
- Crear docs/task.md
- Crear docs/phases/
- Configurar i18n es-AR
- Configurar Vitest + React Testing Library
- Configurar scripts base
```

Criterio de éxito:

```text
El proyecto arranca, compila, tiene estructura documental clara y puede ser trabajado por Codex sin depender de un AGENTS.md gigante.
```

---

## 0.2.0 — Modelo narrativo base

Objetivo: implementar la jerarquía flexible del producto.

Incluye:

```text
- Modelo StoryWorld
- Modelo Work
- Modelo Part
- Modelo Chapter
- Modelo Scene
- Tipos de obra
- Tipos de escena
- Estados de escena
- Datos iniciales de prueba
- Validaciones básicas del modelo
```

Criterio de éxito:

```text
La app puede representar una obra independiente o una saga con varias obras sin cambiar la arquitectura.
```

---

## 0.3.0 — Estructura de obra y navegación

Objetivo: permitir que el escritor cree y navegue la estructura narrativa.

Incluye:

```text
- Crear mundo narrativo
- Crear obra
- Crear partes opcionales
- Crear capítulos opcionales
- Crear escenas
- Renombrar elementos
- Eliminar con confirmación
- Reordenar escenas
- Navegación por árbol narrativo
- Filtros básicos por estado/tipo
```

Criterio de éxito:

```text
El escritor puede armar la estructura de un cuento, novela o saga antes de escribir el contenido final.
```

---

## 0.4.0 — Editor Sofer básico

Objetivo: escribir contenido rich-text por escena.

Incluye:

```text
- Integrar Tiptap
- Editor por escena
- Toolbar mínima
- Guardar contenido como JSON estructurado
- Contador de palabras
- Estado de guardado
- Separador de escena
- Atajos básicos
```

Criterio de éxito:

```text
El escritor puede seleccionar una escena, escribir en ella, cambiar de escena y conservar el contenido.
```

---

## 0.5.0 — Guardado, autoguardado y recuperación

Objetivo: proteger el texto.

Incluye:

```text
- Crear proyecto local
- Abrir proyecto local
- Guardar proyecto local
- Autoguardado
- Snapshots
- Recuperación ante cierre inesperado
- Indicador Guardado / Sin guardar
- Validación de integridad del archivo
```

Criterio de éxito:

```text
La app prioriza no perder texto y puede recuperarse ante cierres inesperados o errores comunes.
```

---

## 0.6.0 — Panel contextual y modo concentración

Objetivo: permitir escribir con foco y consultar contexto sin abandonar la escena.

Incluye:

```text
- Modo concentración
- Modo contexto
- Editor 50% + panel contextual 50%
- Panel contextual cerrable
- Consulta de escena activa
- Consulta de capítulo/parte/obra
- Consulta de mundo narrativo
- Persistencia básica de layout
- Preservar cursor y estado del editor al abrir/cerrar panel
```

Criterio de éxito:

```text
El escritor puede abrir contexto, leer lo necesario y volver a escribir sin perder foco ni estado del editor.
```

---

## 0.7.0 — Núcleo narrativo y planificación de escena

Objetivo: incorporar la brújula narrativa de la obra.

Incluye:

```text
- Módulo Núcleo narrativo
- Premisa dramática
- Premisa de autor / tesis
- Pregunta central
- Tema principal
- Conflicto central
- Promesa narrativa
- Planificación de escena
- Tipo de escena
- Objetivo, conflicto, resultado, POV, lugar
```

Criterio de éxito:

```text
La escena activa puede relacionarse con la premisa, tesis, conflicto central y función narrativa.
```

---

## 0.8.0 — Módulos narrativos principales

Objetivo: sumar los módulos de apoyo más importantes para escritores.

Incluye:

```text
- Personajes
- Lugares
- Trama y subtramas
- Notas vinculadas
- Vínculos entre módulos y escenas
- Vínculos a nivel obra y mundo narrativo
```

Criterio de éxito:

```text
El escritor puede consultar y vincular personajes, lugares, tramas y notas con escenas concretas.
```

---

## 0.9.0 — Referencias, objetivos y revisión básica

Objetivo: completar módulos útiles sin inflar la app.

Incluye:

```text
- Referencias simples
- Objetivos de palabras
- Progreso básico
- Estados de revisión
- Listados por estado
- Continuidad básica
- Ajustes de UX
```

Criterio de éxito:

```text
El escritor puede controlar avance, referencias y estado general de la obra sin sistemas editoriales complejos.
```

---

## 1.0.0 — Exportación, estabilidad y release inicial

Objetivo: entregar una versión funcional, estable y útil para escritores.

Incluye:

```text
- Exportación RTF
- Exportar obra completa
- Exportar parte/capítulo/escena
- Revisión final de guardado
- Revisión final de recuperación
- Pulido de diseño
- Accesibilidad básica
- Tests principales
- Build Windows estable
- Documentación final
```

Criterio de éxito:

```text
Un escritor puede planificar, escribir, guardar, recuperar y exportar una obra narrativa real en Kohelet.
```

---

## 11. Alcance explícitamente aplazado

No implementar antes de 1.0 salvo decisión explícita:

```text
- IA generativa o asistente inteligente
- Sincronización cloud
- Colaboración multiusuario
- Exportación DOCX completa
- Exportación PDF avanzada
- Comentarios editoriales
- Control de cambios
- Adjuntos pesados
- Mapas visuales complejos
- Cronología avanzada
- Lore avanzado
- Estadísticas narrativas profundas
- Marketplace de plantillas
```

---

## 12. Documentación recomendada del repo

Raíz:

```text
AGENTS.md
DESIGN.md
project_requirements.md
README.md
```

Carpeta `docs/`:

```text
docs/index.md
docs/task.md
docs/decisions.md
docs/architecture.md
docs/codex-workflow.md
docs/data-model.md
docs/editor-core.md
docs/export.md
docs/glossary.md
docs/i18n.md
docs/release.md
docs/storage.md
docs/testing.md
docs/phases/
```

Rol de documentos:

```text
AGENTS.md
→ Cómo deben comportarse los agentes.

DESIGN.md
→ Sistema visual, UX, layout y tono de interfaz.

project_requirements.md
→ Contrato técnico estable del proyecto.

docs/index.md
→ Mapa de documentación.

docs/task.md
→ Checklist vivo de avance.

docs/decisions.md
→ Decisiones tomadas y motivo.

docs/phases/*
→ Historial de implementación por fase.
```

---

## 13. Regla final de producto

Cada feature debe responder al menos una de estas preguntas:

```text
¿Ayuda a planificar mejor?
¿Ayuda a escribir con más foco?
¿Ayuda a no perder texto?
¿Ayuda a entender la historia?
¿Ayuda a exportar el manuscrito?
```

Si no responde ninguna, no pertenece al camino hacia 1.0.
