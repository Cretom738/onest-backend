import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { ConfigService } from '@nestjs/config';
import { ArgonService } from 'src/libs/services/argon/argon.service';
import { PrismaService } from 'src/libs/services/prisma/prisma.service';

@Module({
  providers: [SessionsService, PrismaService, ConfigService, ArgonService]
})
export class SessionsModule {}
