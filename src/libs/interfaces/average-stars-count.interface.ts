import { Prisma } from '@prisma/client';

export interface IAverageStarCount {
  _avg: { starCount: Prisma.Decimal | null };
}
