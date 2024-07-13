-- CreateEnum
CREATE TYPE "ECondition" AS ENUM ('NEW', 'USED');

-- CreateTable
CREATE TABLE "Ad" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "images" TEXT[],
    "conditions" "ECondition" NOT NULL DEFAULT 'NEW',
    "brand" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "is_original" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[],
    "profile_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
