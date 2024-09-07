-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "star_count" INTEGER NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "reviewer_profile_id" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_profile_id_fkey" FOREIGN KEY ("reviewer_profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
