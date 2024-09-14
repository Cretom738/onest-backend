import { Prisma } from "@prisma/client";

const profileWithRelatedTable = Prisma.validator<Prisma.ProfileDefaultArgs>()({
    include: {
        user: true,
        socialMedias: true
    }
});

export type ProfileWithRelatedTable = Prisma.ProfileGetPayload<typeof profileWithRelatedTable>;

const reviewWithRelatedTable = Prisma.validator<Prisma.ReviewDefaultArgs>()({
    select: {
        id: true,
        description: true,
        starCount: true,
        profileId: true,
        reviewerProfileId: true,
        reviewerProfile: {
            select: {
                user: {
                    select: {
                        fullName: true
                    }
                }
            }
        }
    }
});

export type ReviewWithRelatedTable = Prisma.ReviewGetPayload<typeof reviewWithRelatedTable>;