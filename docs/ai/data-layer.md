# Capa de datos

Hoy el sitio **no consume ninguna API**: todo el contenido está en el HTML. Esta capa existe para que, si aparece una (por ejemplo, listar repos de GitHub o un servicio de formularios), se haga de una sola manera. Agregar una API requiere spec.

## Flujo

```
<f>.page.js ──> features/<f>/services/<recurso>.js ──> core/http.js ──> fetch
```

- **Solo `core/http.js` llama a `fetch`** (lint `no-restricted-globals`).
- Los services exportan funciones con nombre de dominio (`getRepositories()`), llaman a `request()` y **mapean** la respuesta al modelo que usa el feature (renombrar campos, descartar lo que no se usa). El resto del feature nunca ve la forma cruda de la API.
- Los hosts se definen en `core/config.js` (nunca hardcodeados en el service).

## `core/http.js`

`request(path, { method, body, headers, timeoutMs, signal, baseUrl })`:

- Resuelve `path` contra `config.apiBaseUrl` (o `baseUrl`).
- Serializa `body` como JSON y agrega `Content-Type`.
- Devuelve JSON parseado, texto, o `null` (204 / vacío).
- Timeout por defecto `config.httpTimeoutMs` (10 s) vía `AbortSignal.timeout`; acepta `signal` externo para cancelar.

### Errores tipados

| Error          | Cuándo                                 | Datos               |
| -------------- | -------------------------------------- | ------------------- |
| `HttpError`    | La respuesta llegó con status no-2xx   | `status`, `body`    |
| `NetworkError` | Sin conexión, DNS, CORS                | `cause`             |
| `TimeoutError` | Se superó el timeout                   | `timeoutMs`         |
| `AbortError`   | Cancelado por el `signal` del llamador | se relanza tal cual |

El service puede traducir `HttpError` de negocio (p. ej. 404 → "no encontrado") a un valor o error propio del feature. La página decide qué estado de UI mostrar (error / vacío) según el tipo.

## Reintentos

- Por defecto **no** hay reintentos automáticos.
- Solo se reintentan peticiones idempotentes (`GET`) ante `NetworkError`, `TimeoutError` o 5xx, con backoff, y solo si la spec lo pide.
- En la UI, el estado de error ofrece un botón "Retry" cuando tiene sentido.

## Tests

Todo service tiene test con `fetch` mockeado (`vi.stubGlobal('fetch', …)`): éxito, error HTTP, red y timeout. Ver `tests/core/http.test.js` como referencia.
