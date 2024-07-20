import { ERole } from "@prisma/client";
import { CreateUserDto } from "src/libs/dtos/create-user.dto";
import { ProfileDto } from "src/libs/dtos/profile.dto";

export interface IUsersService {

    createUser(data: CreateUserDto): Promise<{ id: number, roles: ERole[] }>;

    findUserById(id: number): Promise<any>;

    findUserByEmail(email: string): Promise<{ id: number, roles: ERole[], hashedPassword: string, profileId: number }>;

    createUserProfile(userId: number): Promise<number>;

    getUserProfile(userId: number): Promise<ProfileDto>;

    updateUserProfile(userId: number, data: ProfileDto): Promise<void>;
}