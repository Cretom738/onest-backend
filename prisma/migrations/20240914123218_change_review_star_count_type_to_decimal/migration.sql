/*
  Warnings:

  - You are about to alter the column `star_count` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(2,1)`.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "star_count" SET DATA TYPE DECIMAL(2,1);
