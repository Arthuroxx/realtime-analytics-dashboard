import { envSchema } from '../src/config/env.schema.js';

const env = envSchema.parse(process.env);

const config = {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  name: env.DATABASE_NAME,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  'migrations-dir': 'database/migrations',
  'migrations-table': 'pgmigrations',
  'migration-file-language': 'ts',
  'migrations-filename-format': 'timestamp',
  'check-order': true,
};

export default config;
