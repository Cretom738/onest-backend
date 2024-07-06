import { Prisma } from "@prisma/client";

const profileWithRelatedTable = Prisma.validator<Prisma.ProfileDefaultArgs>()({
    include: {
        user: true,
        socialMedias: true
    }
});

export type ProfileWithRelatedTable = Prisma.ProfileGetPayload<typeof profileWithRelatedTable>