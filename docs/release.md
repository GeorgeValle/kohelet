# docs/release.md — Kohelet

> Documento de release, versiones, criterios de salida y checklist previo a publicación.  
> Debe ayudar a que Kohelet 1.0 salga estable y sin improvisar empaquetado.

**Proyecto:** Kohelet  
**Editor:** Sofer  
**Estado:** inicial  
**Última revisión:** 2026-05-24

---

## 1. Objetivo

Definir criterios para publicar versiones de Kohelet, especialmente la versión 1.0.

Kohelet 1.0 debe permitir:

```text
crear mundo narrativo,
crear obra,
organizar partes/capítulos/escenas,
definir núcleo narrativo,
escribir escenas en Sofer,
consultar panel contextual,
guardar/autoguardar/recuperar,
crear personajes/lugares/tramas/notas,
exportar a RTF.
```

---

## 2. Versionado

Usar versionado semántico cuando el producto esté activo:

```text
MAJOR.MINOR.PATCH
```

Ejemplos:

```text
0.1.0 → base técnica inicial
0.2.0 → editor Sofer inicial
0.3.0 → estructura narrativa
0.4.0 → storage/autosave
0.5.0 → módulos narrativos
0.8.0 → exportación RTF
1.0.0 → release estable inicial
```

Mientras esté en desarrollo temprano, las versiones `0.x` pueden usarse como hitos.

---

## 3. Plataforma objetivo 1.0

Prioridad:

```text
Windows estable
```

Tauri puede permitir otras plataformas, pero 1.0 debe validar Windows primero.

Reglas:

- No asumir que `pnpm run build` valida la app de escritorio.
- Validar build Tauri.
- Validar apertura, guardado y exportación en entorno desktop.

---

## 4. Criterios mínimos para 1.0

Core obligatorio:

- [ ] App de escritorio funcional.
- [ ] Tema claro, oscuro y sistema.
- [ ] CSS Modules + tokens funcionando.
- [ ] i18n `es-AR` sin textos visibles hardcodeados críticos.
- [ ] Estructura `StoryWorld → Work → Part → Chapter → Scene`.
- [ ] Escena como unidad principal.
- [ ] Editor Sofer estable para escribir.
- [ ] Panel contextual abrible/cerrable.
- [ ] Guardado local.
- [ ] Autoguardado.
- [ ] Snapshots.
- [ ] Recovery básico.
- [ ] Núcleo narrativo.
- [ ] Personajes.
- [ ] Lugares.
- [ ] Trama/subtramas.
- [ ] Notas vinculadas.
- [ ] Exportación RTF.
- [ ] Tests críticos pasando.

---

## 5. Recomendable para 1.0

- [ ] Referencias simples.
- [ ] Objetivos de palabras.
- [ ] Revisión básica por estado.
- [ ] Continuidad básica.
- [ ] Filtros por tipo/estado de escena.

Si estas features comprometen estabilidad, pueden pasar a post-1.0.

---

## 6. Fuera de alcance para 1.0

No bloquear release por:

```text
IA asistente
Sincronización cloud
Colaboración multiusuario
Comentarios editoriales avanzados
Control de cambios
DOCX completo
PDF avanzado
Cronología avanzada
Mapas visuales complejos
Adjuntos pesados
Análisis automático de ritmo
Plantillas narrativas avanzadas
```

---

## 7. Checklist técnico pre-release

Antes de una versión:

```bash
pnpm install --frozen-lockfile
pnpm run lint
pnpm run test
pnpm run build
pnpm tauri build
```

Además:

- [ ] Crear proyecto nuevo.
- [ ] Abrir proyecto existente.
- [ ] Escribir y guardar escena.
- [ ] Cerrar y reabrir app.
- [ ] Verificar recuperación si hay datos pendientes.
- [ ] Exportar RTF.
- [ ] Revisar modo claro.
- [ ] Revisar modo oscuro.
- [ ] Revisar panel contextual.
- [ ] Revisar árbol narrativo.

---

## 8. Checklist de documentación

Antes de release:

- [ ] `README.md` actualizado.
- [ ] `roadmap.md` actualizado.
- [ ] `project_requirements.md` actualizado si cambió alcance.
- [ ] `DESIGN.md` actualizado si cambió diseño.
- [ ] `docs/task.md` actualizado.
- [ ] `docs/decisions.md` con ADRs importantes.
- [ ] `docs/phases/*` actualizado.
- [ ] `docs/release.md` actualizado.

---

## 9. Checklist de seguridad de texto

Validar especialmente:

- [ ] no se pierde texto al cambiar de escena,
- [ ] no se pierde texto al cerrar app,
- [ ] no se pierde texto si falla exportación,
- [ ] snapshots existen,
- [ ] recovery funciona,
- [ ] migraciones preservan contenido.

---

## 10. Release notes

Cada release debería incluir:

```text
Versión
Fecha
Resumen
Nuevas funciones
Correcciones
Cambios de documentación
Limitaciones conocidas
Próximos pasos
```

Ejemplo:

```md
## Kohelet 0.3.0

### Nuevo
- Estructura narrativa inicial.
- Tipos de escena.

### Correcciones
- Corrección de orden de escenas.

### Limitaciones
- Exportación todavía no disponible.
```

---

## 11. Criterios para pasar una feature a post-1.0

Mover a post-1.0 si:

- aumenta demasiado el riesgo,
- no es necesaria para escribir/guardar/exportar,
- requiere arquitectura no lista,
- retrasa estabilidad,
- no puede testearse bien todavía.

Registrar el cambio en `docs/decisions.md` si afecta alcance.

---

## 12. Checklist para Codex

Antes de cerrar una tarea de release:

- [ ] Se revisó este archivo.
- [ ] Se actualizaron checklists.
- [ ] Se ejecutaron comandos disponibles.
- [ ] Se documentaron limitaciones conocidas.
- [ ] Se actualizó `docs/task.md`.
- [ ] Se actualizó `docs/phases/*`.
