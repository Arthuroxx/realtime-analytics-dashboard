import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  API_PREFIX: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .regex(
      /^[a-z0-9]+(?:[-/][a-z0-9]+)*$/,
      'API_PREFIX must contain lowercase alphanumeric segments separated by "-" or "/"',
    )
    .default('api'),
  DATABASE_HOST: z.string().trim().min(1).default('127.0.0.1'),
  DATABASE_PORT: z.coerce.number().int().min(1).max(65535).default(5433),
  DATABASE_NAME: z.string().trim().min(1).default('realtime_analytics'),
  DATABASE_USER: z.string().trim().min(1).default('realtime_analytics'),
  DATABASE_PASSWORD: z.string().min(1).default('change-me-in-your-local-env'),
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(100).default(10),
  DATABASE_CONNECTION_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .min(1_000)
    .max(60_000)
    .default(5_000),
  DATABASE_IDLE_TIMEOUT_MS: z.coerce
    .number()
    .int()
    .min(1_000)
    .max(600_000)
    .default(10_000),
});

export type Environment = z.infer<typeof envSchema>;
