import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'src/libs/config/config.schema';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthMiddleware } from '../libs/middlewares/auth.middleware';
import { InternalJwtModule } from './internal-jwt/internal-jwt.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { getRedisConfig } from 'src/libs/config/redis.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: configSchema
  }),
  RedisModule.forRootAsync(getRedisConfig()),
  AuthModule,
  SessionsModule,
  InternalJwtModule
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
