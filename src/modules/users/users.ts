import { ERole } from "@prisma/client";
import { IAverageStarCount } from "src/libs/interfaces/average-stars-count.interface";
import { ProfileWithRelatedTable } from "src/libs/types/prisma.type";
import { CreateUserDto } from "src/modules/users/dtos/create-user.dto";
import { ProfileDto } from "src/modules/users/dtos/profile.dto";

export interface IUsersService {

    createUser(data: CreateUserDto): Promise<{ id: number, roles: ERole[] }>;

    findUserById(id: number): Promise<any>;

    findUserByEmail(email: string): Promise<{ id: number, roles: ERole[], hashedPassword: string, profileId: number }>;

    createUserProfile(userId: number): Promise<number>;

    getUserProfile(userId: number, profileId: number): Promise<[ ProfileWithRelatedTable, IAverageStarCount ]>;

    updateUserProfile(userId: number, data: ProfileDto): Promise<void>;
}