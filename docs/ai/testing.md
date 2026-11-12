# Tests

Vitest + jsdom (`vitest.config.js`). `npm run test` corre todo una vez; `npx vitest` en modo watch.

## Qué se testea (obligatorio)

| Código                    | Test                                                                        |
| ------------------------- | --------------------------------------------------------------------------- |
| `shared/utils/*`          | Casos normales, bordes (vacío, null, unicode) y errores                     |
| `features/<f>/state.js`   | Acciones y getters derivados, sin DOM                                       |
| `features/<f>/services/*` | `fetch` mockeado: éxito, `HttpError`, `NetworkError`, `TimeoutError`, mapeo |
| `core/*`                  | Comportamiento público                                                      |
| `src/i18n/*`              | Mismas claves en todos los idiomas                                          |

## Qué es opcional

- Componentes (`initX`, `createX`): test con jsdom cuando tienen comportamiento (teclado, aria, eventos). Se prueba lo que ve el usuario (texto, roles, atributos), no la estructura interna.
- Lo visual (layout, colores, responsive, contraste) se verifica a mano en `/verify` ("verificar a mano").

## Convenciones

- Ubicación espejo: `src/shared/utils/escape-html.js` → `tests/shared/utils/escape-html.test.js`.
- Nombres de `describe` = la función o módulo; nombres de `it` en español describiendo el comportamiento.
- Mocks de globals con `vi.stubGlobal` y `vi.unstubAllGlobals()` en `afterEach`. `restoreMocks` está activo.
- Sin red real, sin timers reales largos (usa timeouts cortos o `vi.useFakeTimers()`).
- Un bug corregido llega primero con un test que falla (ver `workflows/bugfix.md`).
