# Instalación de dependencias — Kohelet

> Línea base formal para instalar, diagnosticar y validar dependencias de Kohelet con pnpm, Node y GitHub Actions.

## Stack de instalación actual

- Runtime recomendado para CI: Node 22.
- Package manager único: `pnpm@10.28.1`, declarado en `package.json` mediante `packageManager`.
- Registro esperado: `https://registry.npmjs.org/`.
- Workflow de validación web: `.github/workflows/ci.yml`.
- Workflow manual para generar lockfile desde GitHub Actions: `.github/workflows/generate-lockfile.yml` (`Generate pnpm lockfile`).
- Lockfile: `pnpm-lock.yaml` todavía no está commiteado porque no debe generarse desde un entorno que falle al acceder al registro npm.

No actualizar a pnpm 11 ni cambiar el registro de paquetes dentro de una PR de documentación o diagnóstico de instalación. Ese tipo de cambio requiere una decisión separada.

## `.npmrc` esperado

El repositorio debe mantener un `.npmrc` explícito y mínimo:

```ini
registry=https://registry.npmjs.org/
always-auth=false
auto-install-peers=true
strict-peer-dependencies=false
```

Esta configuración fuerza el registro público de npm para dependencias públicas y evita depender de tokens locales o de GitHub Packages. No agregar `NODE_AUTH_TOKEN`, tokens personales, ni configuración de GitHub Packages mientras el proyecto no use paquetes privados.

## Diferencia entre Codex Cloud y GitHub Actions

GitHub Actions es la fuente confiable de validación para la instalación actual porque PR #4 logró CI verde con:

```bash
pnpm install --no-frozen-lockfile --reporter=append-only
pnpm run lint
pnpm run test
pnpm run build
```

El entorno de Codex Cloud puede fallar con `ERR_PNPM_FETCH_403` aun cuando `.npmrc` apunte correctamente a `https://registry.npmjs.org/`. En ese caso, la causa esperada es una limitación de entorno, proxy, red o política de acceso antes de que el request llegue correctamente al registro público. Cambiar Sofer, Tiptap, UI, storage, exportación o modelos narrativos no resuelve ese 403.

## Cuándo usar `--no-frozen-lockfile`

Usar:

```bash
pnpm install --no-frozen-lockfile --reporter=append-only
```

solo mientras `pnpm-lock.yaml` no exista en el repositorio. Este modo permite que GitHub Actions resuelva dependencias desde `package.json` y mantenga verde la validación web hasta que se genere un lockfile válido desde un entorno con acceso correcto al registro npm.

## Cuándo pasar a `--frozen-lockfile`

Después de commitear `pnpm-lock.yaml`, cambiar la instalación de CI a:

```bash
pnpm install --frozen-lockfile --reporter=append-only
```

Desde ese momento, fallar si `package.json` y `pnpm-lock.yaml` divergen es deseable: protege reproducibilidad y evita actualizaciones implícitas de dependencias.

## Cuándo habilitar `cache: pnpm`

No usar `cache: pnpm` en `actions/setup-node@v4` mientras falte `pnpm-lock.yaml`, porque el cache de pnpm de `setup-node` requiere un lockfile estable para calcular la clave de cache.

Habilitarlo únicamente cuando `pnpm-lock.yaml` esté commiteado y CI use siempre `--frozen-lockfile`:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: pnpm
```

## Cómo generar `pnpm-lock.yaml`

La vía preferida para esta deuda técnica es usar el workflow manual `Generate pnpm lockfile`, definido en `.github/workflows/generate-lockfile.yml`. Este workflow corre en GitHub Actions con Node 22, instala pnpm mediante `pnpm/action-setup@v4`, ejecuta:

```bash
pnpm install --lockfile-only --reporter=append-only
```

y abre una PR automática contra `main` commiteando solo `pnpm-lock.yaml` en la rama `chore/add-pnpm-lockfile`.

Usar este workflow cuando el entorno local del mantenedor o Codex Cloud no puedan generar el lockfile por diferencias de Node/pnpm, proxy, red o `ERR_PNPM_FETCH_403`. No generar ni editar `pnpm-lock.yaml` manualmente desde un entorno que falle al acceder al registro npm.

Alternativamente, desde un entorno local o remoto con acceso válido al registro público de npm:

```bash
pnpm install
```

Si el comando termina correctamente:

1. revisar que se haya creado `pnpm-lock.yaml`;
2. commitear `pnpm-lock.yaml`;
3. abrir una PR dedicada que solo incorpore el lockfile generado;
4. dejar el endurecimiento de CI para una PR posterior, una vez mergeado `pnpm-lock.yaml`.

Esta PR no fuerza todavía `--frozen-lockfile`: el workflow de CI debe conservar el fallback condicional hasta que el lockfile exista en `main`. Después de mergear `pnpm-lock.yaml`, una PR posterior debe cambiar `.github/workflows/ci.yml` para usar siempre `pnpm install --frozen-lockfile --reporter=append-only` y habilitar `cache: pnpm`.

Si `pnpm install` falla con `ERR_PNPM_FETCH_403`, no commitear un lockfile parcial ni cambiar dependencias para sortear la red del entorno. Registrar el fallo y generar el lockfile con el workflow manual de GitHub Actions.

## Comandos locales recomendados

```bash
pnpm install
pnpm run lint
pnpm run test
pnpm run build
```

Si se trabaja en Tauri y las dependencias están instaladas correctamente, validar también:

```bash
pnpm run tauri:build
```

`tauri:build` no forma parte del workflow web actual y sigue pendiente hasta que se valide explícitamente el flujo de escritorio.

## Comandos de CI actuales

Mientras falte `pnpm-lock.yaml`, el workflow debe instalar con fallback:

```bash
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile --reporter=append-only
else
  echo "pnpm-lock.yaml is missing; installing with --no-frozen-lockfile until the lockfile is committed."
  pnpm install --no-frozen-lockfile --reporter=append-only
fi
```

Luego debe ejecutar:

```bash
pnpm run lint
pnpm run test
pnpm run build
```

## Troubleshooting de `ERR_PNPM_FETCH_403`

1. Confirmar versiones y registry:

   ```bash
   node -v
   pnpm -v
   npm config get registry
   pnpm config get registry
   ```

2. Confirmar que `.npmrc` mantiene el registro público y no contiene tokens.
3. Revisar variables de entorno de proxy o autenticación:

   ```bash
   env | grep -i proxy || true
   env | grep -i token || true
   ```

4. Si el error dice que no se envió authorization header y aun así el registro es `https://registry.npmjs.org/`, tratarlo como limitación del entorno/proxy cuando GitHub Actions valida correctamente.
5. No agregar GitHub Packages, `NODE_AUTH_TOKEN` ni credenciales para resolver dependencias públicas.
6. No modificar Sofer, Tiptap, UI, storage, exportación ni modelos narrativos como respuesta a un 403 de instalación.
7. Si local o Codex Cloud no pueden generar `pnpm-lock.yaml`, disparar manualmente el workflow `Generate pnpm lockfile` desde GitHub Actions.
