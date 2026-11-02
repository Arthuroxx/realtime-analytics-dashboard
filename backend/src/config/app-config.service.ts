import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig, getDatabaseConfig } from './database.config.js';
import { Environment } from './env.schema.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService<Environment, true>) {}

  get nodeEnv(): Environment['NODE_ENV'] {
    return this.config.getOrThrow('NODE_ENV', { infer: true });
  }

  get port(): Environment['PORT'] {
    return this.config.getOrThrow('PORT', { infer: true });
  }

  get apiPrefix(): Environment['API_PREFIX'] {
    return this.config.getOrThrow('API_PREFIX', { infer: true });
  }

  get database(): DatabaseConfig {
    return getDatabaseConfig(this.config);
  }
}
