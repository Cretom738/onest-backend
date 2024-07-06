/*
  Warnings:

  - A unique constraint covering the columns `[profile_id,network]` on the table `social_medias` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "social_medias_profile_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "social_medias_profile_id_network_key" ON "social_medias"("profile_id", "network");
