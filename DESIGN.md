---
version: alpha
name: Kohelet-design-system
description: |
  Sistema visual y de experiencia para Kohelet, una aplicación de escritorio para escritores.
  Kohelet debe sentirse como un escritorio de escritura serio, cálido y silencioso: una herramienta
  para planificar, escribir, revisar y exportar obras narrativas largas o cortas sin convertirse en
  un clon de Word, un dashboard corporativo ni una app de notas genérica.
product:
  app: Kohelet
  editor: Sofer
  type: Desktop writing application
  primaryLanguage: es-AR
themeModes:
  - light
  - dark
  - system
cssStrategy:
  globalTokens: src/styles/tokens.css
  globalBase: src/styles/globals.css
  componentStyles: ComponentName.module.css
codexSkills:
  cssModulesUi: .agents/skills/css-modules-ui/SKILL.md
  richTextEditor: .agents/skills/rich-text-editor/SKILL.md
  tauriStorage: .agents/skills/tauri-storage/SKILL.md
  i18nUi: .agents/skills/i18n-ui/SKILL.md
  testingReact: .agents/skills/testing-react/SKILL.md
  docsMaintenance: .agents/skills/docs-maintenance/SKILL.md
colors:
  light:
    bgApp: "#fbf4e8"
    bgSurface: "#fff9ef"
    bgSurfaceSoft: "#f5eadb"
    bgSurfaceRaised: "#fffdf7"
    bgEditor: "#fffdf8"
    bgEditorMuted: "#f8efe3"
    textPrimary: "#251b14"
    textSecondary: "#4b3b2f"
    textMuted: "#76685c"
    textDisabled: "#a99a8c"
    borderSubtle: "rgba(62, 40, 24, 0.14)"
    borderStrong: "rgba(62, 40, 24, 0.28)"
    accent: "#9a673a"
    accentHover: "#7f522f"
    accentActive: "#654024"
    accentSoft: "#ead7bf"
    selection: "rgba(154, 103, 58, 0.22)"
    focusRing: "rgba(176, 116, 62, 0.55)"
    danger: "#b4554a"
    warning: "#b8792c"
    success: "#547a57"
    info: "#4f6f8f"
  dark:
    bgApp: "#15110d"
    bgSurface: "#211913"
    bgSurfaceSoft: "#2a2119"
    bgSurfaceRaised: "#2f261e"
    bgEditor: "#1b1510"
    bgEditorMuted: "#241c15"
    textPrimary: "#f4e8d8"
    textSecondary: "#d6c3ad"
    textMuted: "#a89582"
    textDisabled: "#75685d"
    borderSubtle: "rgba(244, 232, 216, 0.12)"
    borderStrong: "rgba(244, 232, 216, 0.24)"
    accent: "#c98b54"
    accentHover: "#d99c68"
    accentActive: "#e5ad7c"
    accentSoft: "rgba(201, 139, 84, 0.18)"
    selection: "rgba(201, 139, 84, 0.28)"
    focusRing: "rgba(217, 156, 104, 0.58)"
    danger: "#d07167"
    warning: "#d99a4b"
    success: "#7fa87e"
    info: "#8ba9c7"
typography:
  uiFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  editorFamily: "Literata, Georgia, Cambria, Times New Roman, ui-serif, serif"
  monoFamily: "JetBrains Mono, IBM Plex Mono, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
  uiXs: "12px"
  uiSm: "13px"
  uiMd: "14px"
  uiLg: "15px"
  editorMd: "18px"
  editorLg: "20px"
  editorLineHeight: 1.68
  headingLineHeight: 1.25
  uiLineHeight: 1.45
spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  section: "48px"
radius:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "14px"
  full: "9999px"
layout:
  minDesktopWidth: "1024px"
  leftRailDefault: "280px"
  leftRailCompact: "56px"
  contextPanelDefault: "420px"
  contextPanelMin: "320px"
  editorMeasure: "72ch"
  topBarHeight: "44px"
  statusBarHeight: "28px"
---

# DESIGN.md — Kohelet

> Documento raíz de diseño para Kohelet. Define el sistema visual, la experiencia de escritorio, el uso de temas, tokens, CSS Modules, layouts, componentes, accesibilidad y reglas para Codex/agentes.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Tipo:** Aplicación de escritorio para escritores  
**Stack visual:** React + TypeScript + CSS Modules + tokens CSS  
**Tema:** claro, oscuro y preferencia del sistema  
**Última revisión:** 2026-05-24

---

## 1. Rol de este documento

`DESIGN.md` define cómo debe verse y sentirse Kohelet.

Este archivo debe ser leído por Codex/agentes antes de tocar:

- componentes visuales,
- layout,
- CSS Modules,
- tokens,
- modo claro/oscuro,
- editor Sofer,
- panel contextual,
- árbol narrativo,
- módulos laterales,
- estados visuales,
- accesibilidad.

Relación con otros documentos:

```text
roadmap.md
→ dirección de producto y fases.

project_requirements.md
→ contrato técnico y alcance funcional.

DESIGN.md
→ experiencia, sistema visual, layout y comportamiento de interfaz.

AGENTS.md
→ reglas de trabajo para Codex/agentes.

docs/task.md
→ checklist vivo de avance.
```

Este documento no reemplaza `project_requirements.md`. Lo complementa desde UX/UI.

---

## 2. Identidad de Kohelet

Kohelet debe sentirse como:

```text
Un escritorio de escritura serio, cálido y silencioso.
```

Debe evitar sentirse como:

```text
- un clon de Word,
- un dashboard corporativo,
- una app de notas genérica,
- una herramienta terminal,
- una web marketing metida dentro de una app,
- un entorno saturado de paneles.
```

La experiencia debe priorizar:

- foco prolongado,
- legibilidad,
- calma visual,
- jerarquía narrativa clara,
- contexto cuando el escritor lo pide,
- retorno rápido a la escritura,
- protección del texto escrito.

Kohelet no compite con el manuscrito: lo acompaña.

---

## 3. Principios de experiencia

### 3.1. Escribir primero

La escena activa y el texto del escritor son el centro de la experiencia.

La UI debe quedar subordinada al acto de escribir.

Reglas:

- El editor Sofer debe tener aire, buena medida de lectura y baja distracción.
- Las acciones secundarias no deben competir con el texto.
- Los módulos deben abrirse como apoyo, no como ruido permanente.
- El layout debe permitir volver rápidamente a modo concentración.

### 3.2. Contexto cuando hace falta

Kohelet debe permitir abrir contexto narrativo sin abandonar la escena.

El escritor puede consultar:

- escena,
- capítulo,
- parte,
- obra,
- mundo narrativo,
- núcleo narrativo,
- personajes,
- lugares,
- tramas,
- notas,
- referencias,
- continuidad.

Pero ese contexto debe ser temporal y cerrable.

### 3.3. Jerarquía narrativa visible

La UI debe representar claramente:

```text
StoryWorld → Work → Part → Chapter → Scene
```

En UI visible:

```text
Mundo narrativo → Obra → Parte → Capítulo → Escena
```

La escena es la unidad principal de escritura.

### 3.4. Sobriedad cálida

La app debe tener una estética de papel, tinta, sepia, madera y escritorio moderno.

No usar blanco puro ni negro puro como superficies principales.

### 3.5. Seguridad emocional y técnica

El escritor debe sentir que su texto está protegido.

Los estados de guardado, recuperación y cambios no guardados deben ser visibles pero tranquilos.

---

## 4. Diferencia con la referencia visual usada

La muestra visual de referencia trabaja con fondo crema, tinta casi negra, bordes finos, pocos efectos, botones simples y una documentación de tokens/componentes muy clara.

Kohelet toma de esa referencia:

```text
- superficies cálidas,
- tinta oscura,
- bordes sutiles,
- baja decoración,
- uso cuidadoso de tokens,
- componentes documentados,
- ausencia de sombras pesadas.
```

Kohelet NO toma:

```text
- estética terminal,
- 100% tipografía monoespaciada,
- ASCII como identidad principal,
- marketing web como layout base,
- rectángulos excesivamente rígidos,
- botones demasiado mínimos para app de escritorio.
```

Kohelet debe parecer una aplicación de escritorio literaria, no un sitio web ni una consola.

---

## 5. Sistema de temas

Kohelet debe soportar:

```text
light
 dark
 system
```

`system` debe respetar la preferencia del sistema operativo.

Preferencia visual:

```text
Diseño dark-first, pero con modo claro completamente cuidado.
```

### 5.1. Reglas de implementación

- Usar CSS variables en `src/styles/tokens.css`.
- Usar `data-theme="light"`, `data-theme="dark"` o resolver `system` desde la app.
- Los componentes no deben hardcodear colores.
- Los componentes deben consumir tokens semánticos.
- Un componente debe verse bien tanto en claro como en oscuro.

Ejemplo:

```css
.card {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-subtle);
}
```

Evitar:

```css
.card {
  background: #fffaf2;
  color: #241c15;
}
```

---

## 6. Estrategia CSS

Kohelet usa una estrategia combinada:

```text
src/styles/tokens.css
→ variables globales de diseño.

src/styles/globals.css
→ reset, body, selección, scrollbars, focus base, estilos globales inevitables.

ComponentName.module.css
→ estilos encapsulados por componente.
```

### 6.1. CSS Modules

Cada componente visual que necesite estilos propios debe tener su homónimo `.module.css`.

```text
AppChrome.tsx
AppChrome.module.css

WritingWorkspace.tsx
WritingWorkspace.module.css

RichTextEditor.tsx
RichTextEditor.module.css

SceneContextPanel.tsx
SceneContextPanel.module.css
```

Si existiera `.jsx`, se aplica la misma regla:

```text
ComponentName.jsx
ComponentName.module.css
```

### 6.2. Regla para archivos CSS globales

Solo se permiten CSS globales para:

```text
src/styles/tokens.css
src/styles/globals.css
```

No crear archivos `.css` globales para componentes.

### 6.3. Nombres de clases

Usar nombres semánticos:

```css
.root {}
.header {}
.title {}
.body {}
.actions {}
.primaryAction {}
.secondaryAction {}
.emptyState {}
.errorState {}
```

Evitar nombres visuales o frágiles:

```css
.bigBox {}
.leftThing {}
.orangeText {}
.topStuff {}
```

### 6.4. Importación recomendada

```tsx
import styles from './WritingWorkspace.module.css';

export function WritingWorkspace() {
  return <section className={styles.root}>...</section>;
}
```

### 6.5. Composición de clases

Si no hay helper existente, usar arrays simples:

```tsx
const className = [
  styles.root,
  isActive ? styles.active : undefined,
  isCompact ? styles.compact : undefined,
].filter(Boolean).join(' ');
```

No agregar dependencias nuevas solo para unir clases sin aprobación.

---

## 7. Tokens CSS recomendados

El archivo real debe vivir en:

```text
src/styles/tokens.css
```

Los CSS Modules pueden heredar y consumir estos tokens sin problema porque las variables CSS viven en el árbol global.

### 7.1. Base recomendada para `tokens.css`

```css
:root,
[data-theme="light"] {
  color-scheme: light;

  --color-bg-app: #fbf4e8;
  --color-bg-surface: #fff9ef;
  --color-bg-surface-soft: #f5eadb;
  --color-bg-surface-raised: #fffdf7;
  --color-bg-editor: #fffdf8;
  --color-bg-editor-muted: #f8efe3;

  --color-text-primary: #251b14;
  --color-text-secondary: #4b3b2f;
  --color-text-muted: #76685c;
  --color-text-disabled: #a99a8c;

  --color-border-subtle: rgba(62, 40, 24, 0.14);
  --color-border-strong: rgba(62, 40, 24, 0.28);

  --color-accent: #9a673a;
  --color-accent-hover: #7f522f;
  --color-accent-active: #654024;
  --color-accent-soft: #ead7bf;

  --color-selection: rgba(154, 103, 58, 0.22);
  --color-focus-ring: rgba(176, 116, 62, 0.55);

  --color-danger: #b4554a;
  --color-warning: #b8792c;
  --color-success: #547a57;
  --color-info: #4f6f8f;

  --font-ui: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-editor: Literata, Georgia, Cambria, "Times New Roman", ui-serif, serif;
  --font-mono: "JetBrains Mono", "IBM Plex Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  --font-size-ui-xs: 12px;
  --font-size-ui-sm: 13px;
  --font-size-ui-md: 14px;
  --font-size-ui-lg: 15px;
  --font-size-editor-md: 18px;
  --font-size-editor-lg: 20px;

  --line-height-ui: 1.45;
  --line-height-editor: 1.68;
  --line-height-heading: 1.25;

  --space-xxs: 2px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-xxl: 32px;
  --space-section: 48px;

  --radius-none: 0;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-full: 9999px;

  --shadow-subtle: 0 1px 2px rgba(62, 40, 24, 0.08);
  --shadow-panel: 0 8px 24px rgba(62, 40, 24, 0.10);

  --layout-topbar-height: 44px;
  --layout-statusbar-height: 28px;
  --layout-left-rail-default: 280px;
  --layout-left-rail-compact: 56px;
  --layout-context-panel-default: 420px;
  --layout-context-panel-min: 320px;
  --layout-editor-measure: 72ch;

  --z-base: 0;
  --z-panel: 10;
  --z-popover: 30;
  --z-modal: 50;
  --z-toast: 70;
}

[data-theme="dark"] {
  color-scheme: dark;

  --color-bg-app: #15110d;
  --color-bg-surface: #211913;
  --color-bg-surface-soft: #2a2119;
  --color-bg-surface-raised: #2f261e;
  --color-bg-editor: #1b1510;
  --color-bg-editor-muted: #241c15;

  --color-text-primary: #f4e8d8;
  --color-text-secondary: #d6c3ad;
  --color-text-muted: #a89582;
  --color-text-disabled: #75685d;

  --color-border-subtle: rgba(244, 232, 216, 0.12);
  --color-border-strong: rgba(244, 232, 216, 0.24);

  --color-accent: #c98b54;
  --color-accent-hover: #d99c68;
  --color-accent-active: #e5ad7c;
  --color-accent-soft: rgba(201, 139, 84, 0.18);

  --color-selection: rgba(201, 139, 84, 0.28);
  --color-focus-ring: rgba(217, 156, 104, 0.58);

  --color-danger: #d07167;
  --color-warning: #d99a4b;
  --color-success: #7fa87e;
  --color-info: #8ba9c7;

  --shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.22);
  --shadow-panel: 0 10px 28px rgba(0, 0, 0, 0.28);
}
```

---

## 8. `globals.css` recomendado

El archivo real debe vivir en:

```text
src/styles/globals.css
```

Base sugerida:

```css
@import './tokens.css';

* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--color-bg-app);
  color: var(--color-text-primary);
  font-family: var(--font-ui);
  font-size: var(--font-size-ui-md);
  line-height: var(--line-height-ui);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

::selection {
  background: var(--color-selection);
}

:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
```

Regla:

```text
No agregar estilos de componentes en globals.css.
```

---

## 9. Color

### 9.1. Modo claro

El modo claro debe recordar a papel cálido, marfil y tinta.

Uso recomendado:

| Uso | Token | Color |
|---|---|---|
| Fondo app | `--color-bg-app` | `#fbf4e8` |
| Superficie panel | `--color-bg-surface` | `#fff9ef` |
| Superficie suave | `--color-bg-surface-soft` | `#f5eadb` |
| Editor | `--color-bg-editor` | `#fffdf8` |
| Texto principal | `--color-text-primary` | `#251b14` |
| Texto secundario | `--color-text-secondary` | `#4b3b2f` |
| Muted | `--color-text-muted` | `#76685c` |
| Acento | `--color-accent` | `#9a673a` |

### 9.2. Modo oscuro

El modo oscuro debe sentirse como carbón, nogal oscuro y sepia.

Uso recomendado:

| Uso | Token | Color |
|---|---|---|
| Fondo app | `--color-bg-app` | `#15110d` |
| Superficie panel | `--color-bg-surface` | `#211913` |
| Superficie suave | `--color-bg-surface-soft` | `#2a2119` |
| Editor | `--color-bg-editor` | `#1b1510` |
| Texto principal | `--color-text-primary` | `#f4e8d8` |
| Texto secundario | `--color-text-secondary` | `#d6c3ad` |
| Muted | `--color-text-muted` | `#a89582` |
| Acento | `--color-accent` | `#c98b54` |

### 9.3. Semánticos

Usar con moderación:

| Uso | Token |
|---|---|
| Error/destructivo | `--color-danger` |
| Advertencia | `--color-warning` |
| Éxito/guardado | `--color-success` |
| Información | `--color-info` |

No usar semánticos como decoración.

---

## 10. Tipografía

Kohelet debe separar tipografía de UI y tipografía de escritura.

### 10.1. UI

Para interfaz:

```css
font-family: var(--font-ui);
```

Uso:

- botones,
- paneles,
- árbol narrativo,
- labels,
- tabs,
- modales,
- estados,
- formularios.

Tamaños recomendados:

| Token | Tamaño | Uso |
|---|---:|---|
| `--font-size-ui-xs` | 12px | metadata, badges pequeños |
| `--font-size-ui-sm` | 13px | árbol, paneles secundarios |
| `--font-size-ui-md` | 14px | UI base |
| `--font-size-ui-lg` | 15px | títulos de panel |

### 10.2. Editor Sofer

Para escritura larga:

```css
font-family: var(--font-editor);
font-size: var(--font-size-editor-md);
line-height: var(--line-height-editor);
```

El editor debe priorizar lectura prolongada.

Reglas:

- No usar tipografía monoespaciada para manuscrito por defecto.
- No usar tamaños pequeños en el área de escritura.
- La medida ideal del texto debe rondar `64ch–76ch`.
- La UI puede ser compacta; el texto no.

### 10.3. Monospace

Usar `--font-mono` solo para:

- IDs técnicos si aparecen,
- logs de desarrollo,
- metadata puntual,
- snippets internos,
- contadores compactos si conviene.

No convertir la app en una estética terminal.

---

## 11. Layout general de escritorio

Kohelet es desktop-first.

Estructura base:

```text
┌─────────────────────────────────────────────────────────────┐
│ Top bar                                                     │
├───────────────┬───────────────────────────────┬─────────────┤
│ Árbol          │ Editor Sofer                  │ Panel       │
│ narrativo      │ Escena activa                 │ contextual  │
│ / módulos      │                               │ opcional    │
├───────────────┴───────────────────────────────┴─────────────┤
│ Status bar: guardado, palabras, escena, estado              │
└─────────────────────────────────────────────────────────────┘
```

### 11.1. Top bar

Debe ser sobria y compacta.

Contenido posible:

- nombre de la app,
- obra activa,
- acciones globales,
- botón de tema,
- estado de guardado compacto,
- acceso a exportación.

Altura recomendada:

```text
44px
```

### 11.2. Panel izquierdo

Uso:

- árbol narrativo,
- mundo narrativo,
- obras,
- partes,
- capítulos,
- escenas,
- accesos a módulos.

Debe poder estar:

```text
expandido
compacto
oculto en modo concentración
```

Ancho recomendado:

```text
280px expandido
56px compacto
```

### 11.3. Área central

Contiene el editor Sofer.

El texto debe centrarse con medida máxima:

```text
max-width: var(--layout-editor-measure); // 72ch
```

En modo concentración, el editor ocupa el foco visual.

### 11.4. Panel contextual derecho

Uso:

- escena actual,
- capítulo,
- parte,
- obra,
- mundo narrativo,
- núcleo narrativo,
- personajes,
- lugares,
- tramas,
- notas,
- referencias,
- continuidad.

Debe ser cerrable y redimensionable.

Ancho inicial recomendado:

```text
420px
```

Mínimo recomendado:

```text
320px
```

---

## 12. Modos de escritura

### 12.1. Modo concentración

```text
┌──────────────────────────────────────────────┐
│ Editor Sofer                                 │
│                                              │
│ Texto de la escena activa...                 │
│                                              │
└──────────────────────────────────────────────┘
```

Reglas:

- Ocultar o compactar paneles secundarios.
- Mantener visible el estado de guardado de forma discreta.
- No mostrar módulos que no fueron solicitados.
- Preservar cursor, selección y scroll.

### 12.2. Modo contexto

```text
┌──────────────────────────┬──────────────────────────┐
│ Editor Sofer              │ Panel contextual          │
│                           │                          │
│ Texto de la escena...     │ Escena                    │
│                           │ Capítulo                  │
│                           │ Parte                     │
│                           │ Obra                      │
│                           │ Mundo narrativo           │
│                           │ Núcleo narrativo          │
│                           │ Personajes / lugares      │
└──────────────────────────┴──────────────────────────┘
```

Reglas:

- El editor puede reducirse aproximadamente a la mitad.
- El panel contextual no debe desmontar el editor.
- El usuario debe poder cerrar el contexto en un clic o atajo.
- El panel debe ser un apoyo temporal, no una pantalla nueva.

### 12.3. Modo compacto

Para ventanas más angostas:

- el panel izquierdo puede pasar a iconos,
- el panel contextual puede abrirse como overlay lateral,
- el editor debe conservar prioridad.

---

## 13. Componentes base

### 13.1. Button

Variantes:

```text
primary
secondary
ghost
toolbar
destructive
```

Reglas:

- Altura mínima: 32px en UI compacta, 36px en acciones principales.
- Radio: `--radius-sm` o `--radius-md`.
- Usar tokens de fondo, texto y borde.
- Focus visible obligatorio.

Ejemplo CSS Module:

```css
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  min-height: 36px;
  padding: 0 var(--space-md);
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  font-size: var(--font-size-ui-md);
  line-height: 1;
}

.primary {
  background: var(--color-accent);
  color: var(--color-bg-surface-raised);
}

.secondary {
  background: var(--color-bg-surface);
  color: var(--color-text-primary);
  border-color: var(--color-border-subtle);
}
```

### 13.2. Input / Textarea

Reglas:

- Fondo suave.
- Borde sutil.
- Focus claro.
- No usar sombras fuertes.
- Los textareas de planificación deben ser cómodos, no diminutos.

### 13.3. Panel

Uso:

- módulos,
- contexto,
- inspector,
- detalles.

Tratamiento:

```text
background: var(--color-bg-surface)
border: 1px solid var(--color-border-subtle)
radius: var(--radius-md)
```

Los paneles principales pueden tener esquinas menos redondeadas si forman parte del shell.

### 13.4. Card

Las cards deben ser simples.

Evitar:

- sombras pesadas,
- gradientes,
- brillos decorativos,
- fondos saturados.

### 13.5. Badge / Chip

Usar para:

- tipo de escena,
- estado,
- módulo,
- etiquetas de referencia.

Los badges no deben dominar el texto.

### 13.6. Tabs

Uso:

- panel contextual,
- módulos,
- agrupación de detalles.

Reglas:

- Activo claro.
- Borde inferior o fondo suave.
- Sin animaciones excesivas.

### 13.7. Modal

Uso:

- confirmaciones,
- exportación,
- recuperación,
- acciones destructivas.

Reglas:

- Overlay oscuro/suave.
- Foco atrapado dentro del modal.
- Escape debe cerrar cuando sea seguro.
- Acciones destructivas claramente diferenciadas.

---

## 14. Componentes narrativos

### 14.1. StoryWorldTree

Representa:

```text
Mundo narrativo
└── Obra
    └── Parte
        └── Capítulo
            └── Escena
```

Reglas visuales:

- Indentación clara.
- Íconos discretos.
- Estado activo visible.
- Badges pequeños para estado o tipo de escena.
- No saturar con metadatos.

### 14.2. SceneItem

Debe mostrar como mínimo:

- título,
- estado,
- tipo de escena si está disponible,
- selección activa.

No debe mostrar demasiado contenido en el árbol.

### 14.3. ContextPanel

Debe tener secciones plegables o claramente agrupadas:

```text
Escena actual
Capítulo
Parte
Obra
Mundo narrativo
Núcleo narrativo
Personajes
Lugares
Tramas
Notas
Referencias
Continuidad
```

Reglas:

- No mostrar todo expandido por defecto si genera ruido.
- Priorizar lo relacionado con la escena activa.
- Permitir cerrar rápido.

### 14.4. NarrativeCorePanel

Debe mostrar:

- premisa dramática,
- premisa de autor / tesis,
- pregunta central,
- tema principal,
- conflicto central,
- promesa narrativa,
- resolución esperada,
- logline.

Debe sentirse como brújula narrativa, no como formulario burocrático.

### 14.5. SceneTypeBadge

Tipos iniciales:

```text
Conflicto
Revelación
Decisión
Tensión / Suspenso
Transición
Reacción
Libre
```

No usar colores demasiado fuertes por tipo. La lectura del texto debe seguir siendo prioridad.

---

## 15. Editor Sofer

### 15.1. Superficie del editor

El editor debe sentirse como papel/tinta.

Recomendado:

```css
.editorSurface {
  background: var(--color-bg-editor);
  color: var(--color-text-primary);
  font-family: var(--font-editor);
  font-size: var(--font-size-editor-md);
  line-height: var(--line-height-editor);
}
```

### 15.2. Medida de lectura

```css
.editorContent {
  max-width: var(--layout-editor-measure);
  margin: 0 auto;
}
```

Reglas:

- No expandir texto a todo el ancho disponible en pantallas grandes.
- Usar padding generoso.
- Evitar barras visuales dentro del área de texto.

### 15.3. Toolbar

La toolbar debe ser funcional y discreta.

Acciones iniciales:

```text
Negrita
Cursiva
Subrayado si entra temprano
Párrafo
Título simple
Lista básica
Separador de escena
Deshacer / rehacer
```

Reglas:

- Botones compactos.
- Estado activo claro.
- No imitar una cinta tipo Word.
- No agregar controles que no puedan persistirse/exportarse bien.

### 15.4. Estado de guardado

Mostrar de forma tranquila:

```text
Guardado
Guardando…
Cambios sin guardar
Recuperado
Error de guardado
```

No usar alertas agresivas salvo error real.

---

## 16. Estados de UI

Cada componente interactivo debe contemplar:

```text
default
hover
active
focus-visible
disabled
loading
error cuando aplique
selected cuando aplique
```

Reglas:

- `focus-visible` es obligatorio.
- `disabled` debe verse deshabilitado y no solo cambiar el cursor.
- `loading` debe evitar doble acción.
- `selected` debe ser claro sin depender solo del color.

---

## 17. Accesibilidad

Requisitos:

- Contraste legible en claro y oscuro.
- Navegación por teclado en toolbar, árbol, panel contextual y modales.
- Focus visible.
- Targets cómodos en controles principales.
- No depender solo del color para transmitir estado.
- Permitir reducción de movimiento.
- No usar textos menores a 12px salvo casos muy puntuales.

### 17.1. Movimiento reducido

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 18. Animación y transiciones

Kohelet debe usar animaciones mínimas.

Permitido:

- transición suave de panel contextual,
- hover sutil,
- focus visible,
- apertura/cierre de secciones.

Recomendado:

```text
120ms–180ms
```

Evitar:

- rebotes,
- animaciones largas,
- efectos llamativos,
- transiciones que distraigan durante escritura.

---

## 19. Responsive desktop-first

Kohelet se diseña para escritorio, pero debe tolerar ventanas más chicas.

Breakpoints orientativos:

| Nombre | Ancho | Comportamiento |
|---|---:|---|
| desktop-large | 1280px+ | Layout completo con árbol + editor + contexto |
| desktop | 1024px | Layout base |
| tablet-window | 840px | Panel izquierdo compacto, contexto como overlay si hace falta |
| narrow | 680px | Editor prioritario, navegación colapsada |

No priorizar mobile completo antes de 1.0 salvo necesidad explícita.

---

## 20. i18n visual

Todo texto visible debe salir de:

```text
src/i18n/locales/es-AR.json
```

Excepciones:

```text
Kohelet
Sofer
```

Reglas:

- No hardcodear labels en componentes.
- Los estados visuales también deben usar i18n.
- Los tipos de escena visibles deben salir de i18n.
- Los tooltips deben salir de i18n.

Ejemplo:

```json
{
  "theme": {
    "light": "Claro",
    "dark": "Oscuro",
    "system": "Sistema"
  },
  "editor": {
    "status": {
      "saved": "Guardado",
      "saving": "Guardando…",
      "unsaved": "Cambios sin guardar"
    }
  }
}
```

---

## 21. Iconografía

Usar `lucide-react` de forma sobria.

Reglas:

- Tamaño base: 16px.
- No usar iconos decorativos innecesarios.
- Acompañar icono con texto cuando la acción no sea obvia.
- No depender solo del icono para acciones críticas.
- Mantener stroke consistente.

---

## 22. Densidad visual

Kohelet debe admitir sesiones largas.

Reglas:

- No usar demasiados bordes anidados.
- No llenar el panel contextual de tarjetas pesadas.
- No mostrar todos los metadatos a la vez.
- Usar whitespace como organización.
- Mantener el área de escritura respirable.

---

## 23. Patrones de layout con CSS Modules

### 23.1. Ejemplo de componente layout

```tsx
import styles from './ContextualLayout.module.css';

type ContextualLayoutProps = {
  isContextOpen: boolean;
  children: React.ReactNode;
  context?: React.ReactNode;
};

export function ContextualLayout({ isContextOpen, children, context }: ContextualLayoutProps) {
  const className = [
    styles.root,
    isContextOpen ? styles.withContext : styles.focusMode,
  ].filter(Boolean).join(' ');

  return (
    <section className={className}>
      <main className={styles.editorPane}>{children}</main>
      {isContextOpen ? <aside className={styles.contextPane}>{context}</aside> : null}
    </section>
  );
}
```

```css
.root {
  display: grid;
  min-height: 0;
  background: var(--color-bg-app);
}

.focusMode {
  grid-template-columns: minmax(0, 1fr);
}

.withContext {
  grid-template-columns: minmax(0, 1fr) minmax(var(--layout-context-panel-min), var(--layout-context-panel-default));
}

.editorPane {
  min-width: 0;
  min-height: 0;
  overflow: auto;
}

.contextPane {
  min-width: 0;
  min-height: 0;
  overflow: auto;
  border-left: 1px solid var(--color-border-subtle);
  background: var(--color-bg-surface);
}
```

---

## 24. Componentes y archivos esperados

Cuando se implemente UI, seguir esta forma:

```text
src/components/layout/AppChrome.tsx
src/components/layout/AppChrome.module.css

src/components/layout/WritingWorkspace.tsx
src/components/layout/WritingWorkspace.module.css

src/components/editor/RichTextEditor.tsx
src/components/editor/RichTextEditor.module.css

src/components/editor/RichTextToolbar.tsx
src/components/editor/RichTextToolbar.module.css

src/components/contextual/ContextPanel.tsx
src/components/contextual/ContextPanel.module.css

src/components/project/StoryWorldTree.tsx
src/components/project/StoryWorldTree.module.css
```

Regla:

```text
Si el componente tiene estilos no triviales, debe tener su module.css homónimo.
```

---

## 25. Skills de Codex relacionadas

Cuando una tarea toque diseño o UI, Codex debe usar las skills correspondientes.

### 25.1. `css-modules-ui`

Usar para:

- componentes visuales,
- CSS Modules,
- tokens,
- layout,
- estados,
- theme light/dark.

Debe leer:

```text
DESIGN.md
src/styles/tokens.css
src/styles/globals.css
archivo .tsx/.jsx del componente
archivo .module.css del componente
```

### 25.2. `rich-text-editor`

Usar para:

- Sofer,
- Tiptap,
- toolbar,
- comandos,
- serialización,
- comportamiento del editor.

Regla visual:

```text
El editor no debe desmontarse al abrir/cerrar paneles contextuales.
```

### 25.3. `i18n-ui`

Usar para:

- labels,
- tooltips,
- estados,
- botones,
- textos visibles.

Regla:

```text
No hardcodear textos visibles.
```

### 25.4. `testing-react`

Usar para validar:

- render de componentes,
- estados básicos,
- clases activas cuando sea importante,
- interacción de paneles,
- accesibilidad mínima.

### 25.5. `docs-maintenance`

Usar cuando una tarea cambie:

- alcance,
- fases,
- decisiones de diseño,
- componentes centrales,
- comportamiento de layout.

---

## 26. Anti-patrones

No hacer:

```text
- clonar estética de Word,
- crear una ribbon toolbar gigante,
- usar colores hardcodeados,
- crear CSS global para componentes,
- crear componentes con estilos inline salvo casos mínimos,
- convertir todo en dashboard,
- saturar el editor con paneles permanentes,
- usar negro puro/blanco puro como base,
- usar sombras pesadas,
- usar gradientes decorativos,
- usar tipografía monoespaciada para todo,
- depender solo del color para estados,
- desmontar el editor al abrir el panel contextual,
- introducir módulos post-1.0 como si fueran core.
```

---

## 27. Criterios de aceptación visual

Un cambio de UI es aceptable si:

```text
- respeta tokens,
- funciona en modo claro y oscuro,
- usa CSS Modules para componentes,
- no hardcodea textos visibles,
- mantiene foco en escritura,
- no rompe el panel contextual,
- no desmonta Sofer innecesariamente,
- tiene focus visible,
- no introduce ruido visual,
- se siente como Kohelet y no como dashboard genérico.
```

---

## 28. Checklist para Codex antes de terminar una tarea UI

Antes de cerrar una tarea visual, revisar:

```text
[ ] Leí DESIGN.md.
[ ] Usé la skill css-modules-ui si toqué estilos.
[ ] Usé ComponentName.module.css para estilos del componente.
[ ] Consumí tokens de src/styles/tokens.css.
[ ] No hardcodeé colores si existe token.
[ ] El componente funciona en claro y oscuro.
[ ] No agregué CSS global innecesario.
[ ] No hardcodeé textos visibles.
[ ] El focus visible existe.
[ ] El layout no rompe modo concentración/contexto.
[ ] Si cambié una decisión, actualicé docs/decisions.md.
[ ] Si cerré un bloque, actualicé docs/task.md o docs/phases/*.
```

---

## 29. Regla final de diseño

Antes de agregar una pieza visual, preguntar:

```text
¿Ayuda a escribir con más foco?
¿Ayuda a entender mejor la historia?
¿Ayuda a consultar contexto sin interrumpir?
¿Ayuda a proteger el texto?
¿Ayuda a exportar o revisar con claridad?
```

Si no ayuda a ninguna de esas cosas, probablemente no pertenece al camino hacia 1.0.
