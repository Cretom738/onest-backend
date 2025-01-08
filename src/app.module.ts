import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'src/libs/config/config.schema';
import { AuthModule } from './modules/auth/auth.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { AuthMiddleware } from './libs/middlewares/auth.middleware';
import { InternalJwtModule } from './modules/internal-jwt/internal-jwt.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { getRedisConfig } from 'src/libs/config/redis.config';
import { UsersModule } from './modules/users/users.module';
import { RegionsModule } from './modules/regions/regions.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubCategoriesModule } from './modules/sub-categories/sub-categories.module';
import { AdsModule } from './modules/ads/ads.module';
import { FilesModule } from './modules/files/files.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema,
    }),
    RedisModule.forRootAsync(getRedisConfig()),
    AuthModule,
    SessionsModule,
    InternalJwtModule,
    UsersModule,
    RegionsModule,
    CitiesModule,
    CategoriesModule,
    SubCategoriesModule,
    AdsModule,
    FilesModule,
    ReviewsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
