import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalErrorFilter } from './libs/filters/global-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  
  app.useGlobalFilters(new GlobalErrorFilter());

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
