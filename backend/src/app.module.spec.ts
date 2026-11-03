import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module.js';
import { DATABASE_POOL } from './database/database.constants.js';

describe('AppModule', () => {
  it('compiles the application context', async () => {
    const pool = {
      query: vi.fn().mockResolvedValue({ rows: [] }),
      end: vi.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DATABASE_POOL)
      .useValue(pool)
      .compile();

    expect(module).toBeDefined();
    await module.close();
  });
});
