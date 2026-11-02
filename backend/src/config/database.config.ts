import { ConfigService } from '@nestjs/config';
import { Environment } from './env.schema.js';

export interface DatabaseConfig {
  readonly host: string;
  readonly port: number;
  readonly name: string;
  readonly user: string;
  readonly password: string;
  readonly poolMax: number;
  readonly connectionTimeoutMs: number;
  readonly idleTimeoutMs: number;
}

export function getDatabaseConfig(
  config: ConfigService<Environment, true>,
): DatabaseConfig {
  return {
    host: config.getOrThrow('DATABASE_HOST', { infer: true }),
    port: config.getOrThrow('DATABASE_PORT', { infer: true }),
    name: config.getOrThrow('DATABASE_NAME', { infer: true }),
    user: config.getOrThrow('DATABASE_USER', { infer: true }),
    password: config.getOrThrow('DATABASE_PASSWORD', { infer: true }),
    poolMax: config.getOrThrow('DATABASE_POOL_MAX', { infer: true }),
    connectionTimeoutMs: config.getOrThrow('DATABASE_CONNECTION_TIMEOUT_MS', {
      infer: true,
    }),
    idleTimeoutMs: config.getOrThrow('DATABASE_IDLE_TIMEOUT_MS', {
      infer: true,
    }),
  };
}
