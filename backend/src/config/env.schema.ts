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
});

export type Environment = z.infer<typeof envSchema>;
