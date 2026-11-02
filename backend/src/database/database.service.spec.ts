import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DATABASE_POOL } from './database.constants.js';
import { DatabaseService } from './database.service.js';

describe('DatabaseService', () => {
  let service: DatabaseService;
  const pool = {
    query: vi.fn(),
    end: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    pool.query.mockResolvedValue({ rows: [{ '?column?': 1 }] });
    pool.end.mockResolvedValue(undefined);
    vi.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
    vi.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, { provide: DATABASE_POOL, useValue: pool }],
    }).compile();

    service = module.get(DatabaseService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('checks the initial connection when the module initializes', async () => {
    await service.onModuleInit();

    expect(pool.query).toHaveBeenCalledWith('SELECT 1');
  });

  it('propagates initialization errors so startup fails', async () => {
    pool.query.mockRejectedValueOnce(new Error('database unreachable'));

    await expect(service.onModuleInit()).rejects.toThrow(
      'database unreachable',
    );
  });

  it('reports a healthy connection', async () => {
    await expect(service.checkHealth()).resolves.toBe(true);
    expect(pool.query).toHaveBeenCalledWith('SELECT 1');
  });

  it('reports an unhealthy connection without throwing', async () => {
    pool.query.mockRejectedValueOnce(new Error('connection lost'));

    await expect(service.checkHealth()).resolves.toBe(false);
  });

  it('closes the pool gracefully on application shutdown', async () => {
    await service.onApplicationShutdown();

    expect(pool.end).toHaveBeenCalledTimes(1);
  });
});
