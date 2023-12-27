import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { config, extraOptions, options } from './config/swagger/swaggerOptions';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, extraOptions);

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('NODE_LOCAL_PORT'));
}

bootstrap();
