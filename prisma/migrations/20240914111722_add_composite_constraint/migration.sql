/*
  Warnings:

  - A unique constraint covering the columns `[profile_id,reviewer_profile_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "reviews_profile_id_reviewer_profile_id_key" ON "reviews"("profile_id", "reviewer_profile_id");
