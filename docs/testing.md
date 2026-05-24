# docs/testing.md — Kohelet

> Documento de estrategia de testing.  
> Define qué probar, con qué herramientas y cómo validar cambios sin frenar el desarrollo.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Objetivo

Los tests deben proteger lo más importante de Kohelet:

```text
no perder texto,
mantener estructura narrativa,
exportar correctamente,
no romper el editor,
no romper i18n,
no romper la UI base.
```

No se busca cubrir todo desde el día uno, sino cubrir primero los flujos críticos.

---

## 2. Stack

Herramientas previstas:

```text
Vitest
React Testing Library
```

Posibles herramientas futuras:

```text
Playwright
Testing de comandos Tauri
Testing de build/release
```

Playwright queda opcional/posterior salvo que haga falta para flujos críticos.

---

## 3. Comandos esperados

```bash
pnpm run lint
pnpm run test
pnpm run build
```

Si hay comandos específicos de Tauri:

```bash
pnpm tauri build
```

En WSL, cuando aplique:

```bash
source ~/.nvm/nvm.sh && nvm use 24
```

---

## 4. Pirámide de pruebas inicial

Prioridad:

```text
1. Tests unitarios de modelo y utilidades.
2. Tests unitarios de editor/export/storage.
3. Tests de componentes críticos con React Testing Library.
4. Smoke tests de layout y flujos básicos.
5. E2E post-1.0 o cuando sea necesario.
```

---

## 5. Modelo de datos

Probar:

- creación de `StoryWorld`,
- creación de `Work`,
- creación de `Scene`,
- validación de jerarquía,
- escenas con tipos válidos,
- escenas con `free` + `customTypeLabel`,
- vínculos a personajes/lugares/tramas,
- orden de escenas,
- migraciones.

Archivos sugeridos:

```text
src/lib/model/*.test.ts
```

---

## 6. Editor Sofer

Probar:

- render inicial,
- contenido vacío válido,
- toolbar renderiza botones principales,
- comandos no fallan con editor nulo,
- serialización básica,
- labels i18n,
- el shell no se rompe al cambiar layout.

Archivos sugeridos:

```text
src/components/editor/*.test.tsx
src/lib/editor/*.test.ts
```

---

## 7. Storage

Probar:

- guardar proyecto válido,
- abrir proyecto válido,
- rechazar proyecto inválido,
- migrar versión vieja,
- preservar texto durante migración,
- crear snapshot,
- detectar recovery,
- no usar `localStorage` como fuente principal.

En tests unitarios puede usarse filesystem mock o adaptadores.

Archivos sugeridos:

```text
src/lib/storage/*.test.ts
```

---

## 8. Exportación

Probar:

- compilar obra `scene_only`,
- compilar obra con capítulos,
- compilar obra con partes y capítulos,
- exportar RTF básico,
- exportar TXT si existe,
- conservar orden,
- no exportar notas internas por defecto,
- manejar escenas vacías.

Archivos sugeridos:

```text
src/lib/export/*.test.ts
```

---

## 9. i18n

Probar:

- claves críticas existen,
- labels de toolbar existen,
- labels de tipos de escena existen,
- estados de storage/export existen,
- componentes no muestran `undefined`.

Posible test simple:

```text
src/i18n/i18n.test.ts
```

---

## 10. CSS Modules y UI

Probar con React Testing Library:

- componentes renderizan sin error,
- botones tienen labels accesibles,
- panel contextual se puede abrir/cerrar,
- árbol narrativo renderiza nodos básicos,
- estados vacíos existen.

No se testean colores pixel-perfect en unit tests.

Regla:

```text
Los estilos visuales se controlan con DESIGN.md + tokens + revisión manual.
```

---

## 11. Smoke tests iniciales

Flujos mínimos:

```text
Crear proyecto
Crear obra
Crear escena
Escribir contenido simple
Guardar
Exportar RTF
```

Cuando todavía no exista integración completa, simular partes del flujo por capas.

---

## 12. CI

GitHub Actions debería ejecutar como mínimo:

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run test
pnpm run build
```

Build Tauri puede agregarse cuando el proyecto esté listo para empaquetar.

---

## 13. Convenciones de nombres

```text
*.test.ts
*.test.tsx
```

Ubicar tests cerca del archivo testeado o en carpeta `__tests__` si el repo adopta esa convención.

No mezclar ambas estrategias sin motivo.

---

## 14. Datos de prueba

Crear fixtures si se repiten estructuras:

```text
src/test/fixtures/storyWorldFixtures.ts
src/test/fixtures/editorFixtures.ts
src/test/fixtures/exportFixtures.ts
```

Fixtures útiles:

- cuento con escenas directas,
- novela con capítulos,
- novela larga con partes,
- saga con dos obras,
- escena con contenido rich-text,
- proyecto viejo para migración.

---

## 15. Qué no probar al inicio

No gastar tiempo temprano en:

- snapshots visuales frágiles,
- pixel-perfect CSS,
- E2E extensos antes de tener flujos estables,
- tests que solo verifican implementación interna sin valor.

---

## 16. Checklist para Codex

Antes de cerrar una tarea:

- [ ] Se usó la skill `testing-react` si se agregaron componentes o lógica testeable.
- [ ] Se agregaron tests para cambios de modelo/storage/export/editor.
- [ ] Se ejecutó o se dejó indicado `pnpm run test`.
- [ ] Se evitó testear detalles visuales frágiles.
- [ ] Se actualizaron fixtures si cambió el modelo.
- [ ] Se actualizó `docs/task.md` si corresponde.
