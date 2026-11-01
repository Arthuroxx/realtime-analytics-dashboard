# Backend — Dashboard Analítico en Tiempo Real

API construida con NestJS 12, TypeScript estricto, ESM y Vitest.

## Requisitos

- Node.js 24 LTS (ver `.nvmrc`)
- npm 11+

## Instalación

```bash
npm ci
```

## Ejecución

```bash
npm run start:dev    # desarrollo con recarga
npm run build        # compilar a dist/
npm run start:prod   # ejecutar build (dist/main.js)
```

El servidor escucha en `http://localhost:3000` o en `PORT` si está definido.

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
│   ├── main.ts          # arranque HTTP
│   ├── app.module.ts    # módulo raíz (composición)
│   └── app.module.spec.ts
├── test/                # pruebas e2e
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
