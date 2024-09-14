/*
  Warnings:

  - You are about to alter the column `bio` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `address` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `web` on the `profiles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatar_url" TEXT,
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "web" SET DATA TYPE VARCHAR(100);
