import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalErrorFilter } from './libs/filters/global-error.filter';
import { setupOpenApi } from './libs/config/swagger.config';
import { NestApplication } from '@nestjs/core';

async function bootstrap() {

    const app = await NestFactory.create<NestApplication>(AppModule);

    const configService = app.get<ConfigService>(ConfigService);
    
    app.useGlobalFilters(new GlobalErrorFilter());
  
    app.useGlobalPipes(new ValidationPipe());
  
    if (configService.get('NODE_ENV') !== 'production') {
        
        setupOpenApi(app);
    }
  
    const port = configService.get('PORT');
  
    await app.listen(port);
}
bootstrap();
