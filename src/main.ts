import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';

import { AppModule } from './app.module';
import { ServerConfig } from './types';

async function bootstrap() {
  const serverConfig = config.get<ServerConfig>('server');

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Personal Financial Manager')
    .setDescription('The Personal Financial Manager API description')
    .setVersion('1.0')
    .addTag('personal-financial-manager')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application starts and listening on port ${port}`);
}
bootstrap();
