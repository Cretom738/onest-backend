import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { PrismaService } from 'src/libs/services/prisma.service';
import { SubCategoriesController } from './sub-categories.controller';

@Module({
  providers: [SubCategoriesService, PrismaService],
  controllers: [SubCategoriesController],
})
export class SubCategoriesModule {}
