import { Prisma } from "@prisma/client";

const profileWithUser = Prisma.validator<Prisma.ProfileDefaultArgs>()({
    include: {
        user: true
    }
});

export type ProfileWithUser = Prisma.ProfileGetPayload<typeof profileWithUser>