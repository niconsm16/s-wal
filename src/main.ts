import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config, extraOptions, options } from './config/swagger/swaggerOptions';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, extraOptions);

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('NODE_LOCAL_PORT'));
}

bootstrap();
