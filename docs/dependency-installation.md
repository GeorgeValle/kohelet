# Instalación de dependencias — Kohelet

> Notas operativas para diagnosticar y validar la instalación de dependencias.

## Configuración actual

- El proyecto usa `pnpm@10.28.1`, declarado en `package.json` mediante `packageManager`.
- El repositorio fija el registro público de npm en `.npmrc` y no define tokens de autenticación, para evitar que paquetes públicos se resuelvan por accidente contra un registro privado o credenciales de GitHub Packages.
- El repositorio todavía no tiene `pnpm-lock.yaml` commiteado. Hasta que exista un lockfile, CI instala con `pnpm install --no-frozen-lockfile`; cuando el lockfile exista, CI cambia automáticamente a `pnpm install --frozen-lockfile`.

## Diagnóstico de registry

Cuando `pnpm install` falle, revisar la configuración efectiva de registry y auth/proxy antes de cambiar dependencias:

```bash
pnpm config get registry
npm config get registry
pnpm config list
npm config list
```

Registro esperado:

```text
https://registry.npmjs.org/
```

Si el registro es correcto pero los requests fallan con `ERR_PNPM_FETCH_403`, revisar variables de proxy del entorno como `HTTP_PROXY`, `HTTPS_PROXY`, `npm_config_http_proxy` y `npm_config_https_proxy`. Un proxy puede devolver 403 antes de que npm reciba el request; en ese caso cambiar versiones de paquetes, alcance de Tiptap o código de la app no corrige la instalación.

## Validación en CI

GitHub Actions ejecuta un único workflow, `.github/workflows/ci.yml`, en pull requests y pushes a `main`.

Estado confirmado del workflow en GitHub Actions:

```bash
pnpm install --no-frozen-lockfile --reporter=append-only
pnpm run lint
pnpm run test
pnpm run build
```

Los cuatro pasos pasaron en CI con `pnpm@10.28.1`, Node 22 y el registro público `https://registry.npmjs.org/`.

El workflow imprime versiones de Node/pnpm, registry y variables de proxy antes de instalar dependencias para que problemas de registry, proxy o auth queden visibles en el log del job. Mientras no exista `pnpm-lock.yaml`, no usa cache de pnpm y ejecuta `pnpm install --no-frozen-lockfile --reporter=append-only`.

La instalación local en el entorno de Codex puede seguir fallando con `ERR_PNPM_FETCH_403` por el proxy del entorno; esa falla local no contradice el estado verde de GitHub Actions.
