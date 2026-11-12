# Configuración, secretos y dependencias

## Todo el front es público

No hay bundler ni `.env`: cualquier cosa en el repo o en `src/` llega al navegador y a GitHub. Por eso:

- **Nunca** API keys privadas, tokens, contraseñas ni credenciales en el código.
- Si alguna vez hace falta un secreto, la solución es un backend o una función serverless (requiere spec), no esconderlo en el JS.
- Datos de contacto públicos (email, teléfono, redes) viven en el HTML porque el dev decidió publicarlos; nunca se envían al logger ni a terceros.

## `src/core/config.js`

Único lugar para constantes de entorno y configuración pública: URL del sitio, host de API (si existiera), idioma y tema por defecto, claves de `localStorage`, timeout HTTP, `isDev` (true en `localhost`/`127.0.0.1`). Nada de hosts ni claves de storage escritos en otro archivo.

## Node

- Versión fijada en `.nvmrc` (Node 26 LTS) y `engines` de `package.json` (`engine-strict=true`).
- Gestor: `fnm` (`brew install fnm`). En `~/.zshrc`: `eval "$(fnm env --use-on-cd --shell zsh)"`.
- Mantener el último parche de la línea LTS: `fnm install 26 && fnm default 26` cuando salga un security release.

## Cadena de suministro npm (`.npmrc`)

| Ajuste                | Por qué                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `ignore-scripts=true` | Los paquetes no ejecutan `postinstall` ni otros scripts al instalar (vector de ataque).                             |
| `min-release-age=7`   | Solo instala versiones publicadas hace 7+ días (los paquetes comprometidos se retiran antes). Requiere npm ≥ 11.10. |
| `save-exact=true`     | Versiones exactas en `package.json`, sin rangos `^`.                                                                |
| `allow-git=none`      | Prohíbe dependencias desde repos git (pueden saltarse `ignore-scripts`).                                            |
| `engine-strict=true`  | Falla si la versión de Node no es la del proyecto.                                                                  |

Reglas:

- Instalar con `npm ci` (respeta `package-lock.json`, que se versiona).
- Solo `devDependencies`: el sitio no carga nada de `node_modules` en el navegador.
- **Ninguna dependencia nueva sin aprobación** del dev, anotada en el plan con su motivo.
- Librerías de navegador nuevas se copian versionadas en `assets/vendor/<lib>/` (no CDN sin aprobación).
- `npm audit` periódico; las alertas de dependencias de desarrollo se evalúan, no se fuerzan downgrades con `--force`.
