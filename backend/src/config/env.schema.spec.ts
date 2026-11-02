import { envSchema } from './env.schema.js';

describe('envSchema', () => {
  it('accepts a valid environment', () => {
    const environment = envSchema.parse({
      NODE_ENV: 'production',
      PORT: '4000',
      API_PREFIX: 'api/v1',
    });

    expect(environment).toEqual({
      NODE_ENV: 'production',
      PORT: 4000,
      API_PREFIX: 'api/v1',
    });
  });

  it('applies development defaults for optional variables', () => {
    const environment = envSchema.parse({});

    expect(environment).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      API_PREFIX: 'api',
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
  ])('rejects %s', (_description, input) => {
    expect(envSchema.safeParse(input).success).toBe(false);
  });
});
