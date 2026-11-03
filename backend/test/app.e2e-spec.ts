import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { DATABASE_POOL } from './../src/database/database.constants.js';

describe('Application (e2e)', () => {
  let app: INestApplication<App>;
  const pool = {
    query: vi.fn(),
    end: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    pool.query.mockResolvedValue({ rows: [{ '?column?': 1 }] });
    pool.end.mockResolvedValue(undefined);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DATABASE_POOL)
      .useValue(pool)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('boots the HTTP server without application routes', async () => {
    await request(app.getHttpServer()).get('/').expect(404);
  });
});
