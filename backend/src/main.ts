import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppConfigService } from './config/app-config.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(config.apiPrefix);
  await app.listen(config.port);
}
await bootstrap();
