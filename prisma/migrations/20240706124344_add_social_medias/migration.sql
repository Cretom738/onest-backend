-- CreateEnum
CREATE TYPE "ESocialMediaNetwork" AS ENUM ('TELEGRAM', 'VK', 'INSTAGRAM', 'OK', 'FACEBOOK', 'X', 'LINKEDIN');

-- CreateTable
CREATE TABLE "social_medias" (
    "id" SERIAL NOT NULL,
    "network" "ESocialMediaNetwork" NOT NULL,
    "url" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,

    CONSTRAINT "social_medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_medias_profile_id_key" ON "social_medias"("profile_id");

-- AddForeignKey
ALTER TABLE "social_medias" ADD CONSTRAINT "social_medias_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
