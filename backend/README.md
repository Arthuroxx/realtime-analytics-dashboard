# Backend — Dashboard Analítico en Tiempo Real

API construida con NestJS 12, TypeScript estricto, ESM y Vitest.

## Requisitos

- Node.js 24 LTS (ver `.nvmrc`)
- npm 11+

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

El archivo `.env` es local y está excluido de Git; `.env.example` documenta los
valores de desarrollo.

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
│   ├── config/          # esquema, servicio y módulo de configuración
│   ├── main.ts          # arranque HTTP
│   ├── app.module.ts    # módulo raíz (composición)
│   └── app.module.spec.ts
├── test/                # pruebas e2e
├── .env.example
├── nest-cli.json
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

La lógica se incorporará por módulos funcionales, sin mezclar responsabilidades.
Aún no se incluyen ORM, base de datos ni funcionalidades de negocio.

## Ramas

- `main`: versiones estables.
- `develop`: integración.
- `feature/*`: trabajo por funcionalidad.
