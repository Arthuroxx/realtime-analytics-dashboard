# Infraestructura local

PostgreSQL 18 en Docker para desarrollo. La configuración vive en
`infra/compose.yaml` y las credenciales se leen desde `infra/.env`, que no se
versiona.

## Requisitos

- Docker Engine 24+ con Docker Compose v2

## Configuración inicial

```bash
cp infra/.env.example infra/.env
```

Edita `infra/.env` con tus valores locales. El puerto por defecto es `5433` para
no chocar con una instalación de PostgreSQL en el puerto estándar.

Variables disponibles:

| Variable | Descripción |
| --- | --- |
| `POSTGRES_DB` | Nombre de la base de datos |
| `POSTGRES_USER` | Usuario propietario |
| `POSTGRES_PASSWORD` | Contraseña local |
| `POSTGRES_PORT` | Puerto publicado en `127.0.0.1` |

## Iniciar PostgreSQL

```bash
docker compose -f infra/compose.yaml up -d
```

Compose carga automáticamente `infra/.env`, porque el proyecto se resuelve desde
el directorio del archivo `compose.yaml`. El contenedor publica PostgreSQL
únicamente en `127.0.0.1:<POSTGRES_PORT>`.

## Consultar el estado

```bash
docker compose -f infra/compose.yaml ps
docker inspect --format '{{.State.Health.Status}}' realtime-analytics-postgres
docker compose -f infra/compose.yaml logs -f postgres
```

El healthcheck usa `pg_isready` y el contenedor pasa a `healthy` cuando la base
acepta conexiones.

## Conectarse con psql

```bash
docker compose -f infra/compose.yaml exec postgres \
  sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'
```

También puedes conectarte desde el host:

```bash
psql -h 127.0.0.1 -p 5433 -U realtime_analytics -d realtime_analytics
```

## Detener PostgreSQL

```bash
docker compose -f infra/compose.yaml stop
```

Para volver a iniciarlo:

```bash
docker compose -f infra/compose.yaml start
```

## Persistencia

Los datos se guardan en el volumen nombrado `realtime-analytics-postgres-data`,
montado en `/var/lib/postgresql` (ubicación usada por PostgreSQL 18 y
posteriores). Reiniciar el contenedor o ejecutar `stop`/`start` conserva los
datos:

```bash
docker compose -f infra/compose.yaml restart postgres
docker volume inspect realtime-analytics-postgres-data
```

> **Importante:** nunca ejecutes `docker compose down -v`. La opción `-v` elimina
> el volumen y, con él, todos los datos locales.

Para eliminar solo los contenedores sin borrar el volumen puedes usar
`docker compose -f infra/compose.yaml down` sin `-v`.
