# Backend — Dashboard Analítico en Tiempo Real

API construida con NestJS 12, TypeScript estricto, ESM y Vitest.

## Requisitos

- Node.js 24 LTS (ver `.nvmrc`)
- npm 11+
- Docker con Compose (para PostgreSQL local)

## Instalación

```bash
npm ci
cp .env.example .env
```

## Configuración

Las variables de entorno se validan con Zod al iniciar la aplicación. Si alguna
no cumple el esquema, el arranque falla con un mensaje descriptivo.

| Variable | Valores | Por defecto |
| --- | --- | --- |
| `NODE_ENV` | `development`, `test`, `production` | `development` |
| `PORT` | entero entre 1 y 65535 | `3000` |
| `API_PREFIX` | segmentos en minúscula separados por `-` o `/` | `api` |
| `DATABASE_HOST` | host de PostgreSQL | `127.0.0.1` |
| `DATABASE_PORT` | entero entre 1 y 65535 | `5433` |
| `DATABASE_NAME` | nombre de la base de datos | `realtime_analytics` |
| `DATABASE_USER` | usuario de la base de datos | `realtime_analytics` |
| `DATABASE_PASSWORD` | contraseña local (debe sobrescribirse) | placeholder |
| `DATABASE_POOL_MAX` | conexiones máximas del pool (1-100) | `10` |
| `DATABASE_CONNECTION_TIMEOUT_MS` | timeout de conexión en ms (1000-60000) | `5000` |
| `DATABASE_IDLE_TIMEOUT_MS` | timeout de inactividad en ms (1000-600000) | `10000` |

El archivo `.env` es local y está excluido de Git; `.env.example` documenta los
valores de desarrollo.

## Base de datos

El puerto por defecto coincide con `infra/compose.yaml`. Desde la raíz del
repositorio:

```bash
cp infra/.env.example infra/.env
docker compose -f infra/compose.yaml up -d
```

`DatabaseModule` crea un único `Pool` de `pg` mediante inyección de
dependencias. Al inicializar valida la conexión con `SELECT 1`; si falla, la
aplicación no arranca. `DatabaseService` expone `checkHealth()` y cierra el pool
en `onApplicationShutdown`. `enableShutdownHooks()` en `main.ts` permite que
`SIGINT` y `SIGTERM` ejecuten ese cierre.

El módulo exporta únicamente `DatabaseService`; el token `DATABASE_POOL` queda
privado. La configuración se valida con Zod en `src/config/` y el pool se crea en
`src/database/database.providers.ts`. No hay repositorios, tablas ni endpoints de
base de datos todavía.

## Migraciones

Las migraciones versionadas viven en `database/migrations/` y se escriben en
TypeScript. `node-pg-migrate` reutiliza las variables `DATABASE_*` del mismo
`.env`, sin duplicar credenciales.

```bash
npm run migrate:create -- add-users   # crea una migración nueva
npm run migrate:up                    # aplica las pendientes
npm run migrate:down                  # revierte la última aplicada
npm run migrate:dry-run               # muestra el SQL sin ejecutarlo
```

El historial se guarda en la tabla `pgmigrations` y cada ejecución se aplica en
una transacción (`--single-transaction`). La migración `baseline` está vacía de
forma intencional: las tablas de negocio se añadirán en migraciones posteriores.
No edites migraciones ya aplicadas; crea una nueva.

## Ejecución

```bash
npm run start:dev    # desarrollo con recarga
npm run build        # compilar a dist/
npm run start:prod   # ejecutar build (dist/main.js)
```

El servidor escucha en `http://localhost:<PORT>` con el prefijo global `API_PREFIX`.

## Calidad y pruebas

```bash
npm test             # pruebas unitarias
npm run test:e2e     # pruebas end-to-end
npm run test:cov     # cobertura
npm run lint         # oxlint
npm run format       # prettier
```

## Estructura

```text
backend/
├── src/
│   ├── config/          # esquema Zod y servicios de configuración
│   ├── database/        # módulo, provider del pool y servicio de conexión
│   ├── main.ts          # arranque HTTP y shutdown hooks
│   ├── app.module.ts    # módulo raíz (composición)
│   └── app.module.spec.ts
├── database/
│   ├── migrations/      # migraciones versionadas en TypeScript
│   └── migration.config.ts
├── test/                # pruebas e2e
├── .env.example
├── nest-cli.json
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

La lógica se incorporará por módulos funcionales, sin mezclar responsabilidades.
Aún no se incluyen repositorios, tablas ni endpoints de base de datos.

## Ramas

- `main`: versiones estables.
- `develop`: integración.
- `feature/*`: trabajo por funcionalidad.
