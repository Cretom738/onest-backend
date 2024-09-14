import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'src/libs/config/config.schema';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthMiddleware } from '../libs/middlewares/auth.middleware';
import { InternalJwtModule } from './internal-jwt/internal-jwt.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { getRedisConfig } from 'src/libs/config/redis.config';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';
import { CitiesModule } from './cities/cities.module';
import { CategoriesModule } from './categories/categories.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { AdsModule } from './ads/ads.module';
import { FilesModule } from './files/files.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema
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
    ReviewsModule
  ]
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
