import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsersService } from './users';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';
import { AuthDto } from 'src/libs/dtos/auth.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ERole } from '.prisma/client';
import { NotFoundError } from 'rxjs';
import { ProfileDto } from 'src/libs/dtos/profile.dto';
import { isArray } from 'class-validator';
import { SocialMediaDto } from 'src/libs/dtos/social-media.dto';
import { UpdateProfileDto } from 'src/libs/dtos/update-profile.dto';

@Injectable()
export class UsersService implements IUsersService {

    constructor(private readonly prisma: PrismaService) {
    }
    
    async createUser({ email, fullName, password }: CreateUserDto): Promise<{ id: number, roles: ERole[], profileId: number }> {
        const { id, roles } = await this.prisma.user.create({
            data: {
                email,
                fullName,
                password,
                roles: [ERole.USER]
            }
        });
        const profileId = await this.createUserProfile(id);
        return {
            id,
            roles,
            profileId
        };
    }

    async findUserById(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findUserByEmail(email: string): Promise<{ id: number, roles: ERole[], hashedPassword: string, profileId: number }> {
        
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            include: {
                profile: true
            }
        });

        if (!user) {
            throw new UnauthorizedException('auth.invalid_credentials');
        }

        return {
            id: user.id,
            roles: user.roles,
            hashedPassword: user.password,
            profileId: user.profile.id
        };
    }
    
    async createUserProfile(userId: number): Promise<number> {
        
        return (await this.prisma.profile.create({
            data: {
                userId
            }
        })).id;
    }
    
    async getUserProfile(userId: number): Promise<ProfileDto> {

        const profile = await this.prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                user: true,
                socialMedias: true
            }
        });

        return new ProfileDto(profile);
    }
    
    async updateUserProfile(userId: number, { bio, phone, address, web, socialMedias, cityId }: UpdateProfileDto): Promise<void> {
        
        await this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                bio,
                phone,
                address,
                web,
                cityId
            }
        });

        if (Array.isArray(socialMedias)) {

            await this.prisma.profile.update({
                where: {
                    userId
                },
                data: {
                    socialMedias: {
                        deleteMany: {},
                        createMany: {
                            data: socialMedias
                        }
                    }
                }
            });
        }
    }
}
