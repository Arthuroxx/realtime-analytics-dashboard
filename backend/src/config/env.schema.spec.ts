import { envSchema } from './env.schema.js';

describe('envSchema', () => {
  it('accepts a valid environment', () => {
    const environment = envSchema.parse({
      NODE_ENV: 'production',
      PORT: '4000',
      API_PREFIX: 'api/v1',
      DATABASE_HOST: 'db.internal',
      DATABASE_PORT: '6543',
      DATABASE_NAME: 'analytics',
      DATABASE_USER: 'app',
      DATABASE_PASSWORD: 'secret',
      DATABASE_POOL_MAX: '20',
      DATABASE_CONNECTION_TIMEOUT_MS: '2500',
      DATABASE_IDLE_TIMEOUT_MS: '15000',
    });

    expect(environment).toEqual({
      NODE_ENV: 'production',
      PORT: 4000,
      API_PREFIX: 'api/v1',
      DATABASE_HOST: 'db.internal',
      DATABASE_PORT: 6543,
      DATABASE_NAME: 'analytics',
      DATABASE_USER: 'app',
      DATABASE_PASSWORD: 'secret',
      DATABASE_POOL_MAX: 20,
      DATABASE_CONNECTION_TIMEOUT_MS: 2500,
      DATABASE_IDLE_TIMEOUT_MS: 15000,
    });
  });

  it('applies development defaults for optional variables', () => {
    const environment = envSchema.parse({});

    expect(environment).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      API_PREFIX: 'api',
      DATABASE_HOST: '127.0.0.1',
      DATABASE_PORT: 5433,
      DATABASE_NAME: 'realtime_analytics',
      DATABASE_USER: 'realtime_analytics',
      DATABASE_PASSWORD: 'change-me-in-your-local-env',
      DATABASE_POOL_MAX: 10,
      DATABASE_CONNECTION_TIMEOUT_MS: 5000,
      DATABASE_IDLE_TIMEOUT_MS: 10000,
    });
  });

  it.each([
    ['an unsupported NODE_ENV', { NODE_ENV: 'staging' }],
    ['a non-numeric PORT', { PORT: 'not-a-port' }],
    ['a PORT below the valid range', { PORT: '0' }],
    ['a PORT above the valid range', { PORT: '65536' }],
    ['a fractional PORT', { PORT: '3000.5' }],
    ['an API_PREFIX with a leading slash', { API_PREFIX: '/api' }],
    ['an API_PREFIX with uppercase letters', { API_PREFIX: 'API' }],
    ['an API_PREFIX with spaces', { API_PREFIX: 'my api' }],
    ['an empty DATABASE_HOST', { DATABASE_HOST: '   ' }],
    ['an invalid DATABASE_PORT', { DATABASE_PORT: '70000' }],
    ['an empty DATABASE_NAME', { DATABASE_NAME: '' }],
    ['an empty DATABASE_USER', { DATABASE_USER: '' }],
    ['an empty DATABASE_PASSWORD', { DATABASE_PASSWORD: '' }],
    ['a DATABASE_POOL_MAX below the valid range', { DATABASE_POOL_MAX: '0' }],
    [
      'a DATABASE_CONNECTION_TIMEOUT_MS below the valid range',
      { DATABASE_CONNECTION_TIMEOUT_MS: '999' },
    ],
    [
      'a DATABASE_IDLE_TIMEOUT_MS below the valid range',
      { DATABASE_IDLE_TIMEOUT_MS: '999' },
    ],
  ])('rejects %s', (_description, input) => {
    expect(envSchema.safeParse(input).success).toBe(false);
  });
});
