import { Provider } from '@nestjs/common';
import { Pool } from 'pg';
import { AppConfigService } from '../config/app-config.service.js';
import { DATABASE_POOL } from './database.constants.js';

export const databasePoolProvider: Provider = {
  provide: DATABASE_POOL,
  inject: [AppConfigService],
  useFactory: (config: AppConfigService): Pool => {
    const database = config.database;

    return new Pool({
      host: database.host,
      port: database.port,
      database: database.name,
      user: database.user,
      password: database.password,
      max: database.poolMax,
      connectionTimeoutMillis: database.connectionTimeoutMs,
      idleTimeoutMillis: database.idleTimeoutMs,
      application_name: 'realtime-analytics-api',
    });
  },
};
