import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsersService } from './users';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ERole } from '.prisma/client';
import { ProfileDto } from 'src/modules/users/dtos/profile.dto';
import { UpdateProfileDto } from 'src/modules/users/dtos/update-profile.dto';
import { ProfileWithRelatedTable } from 'src/libs/types/prisma.type';
import { IAverageStarCount } from 'src/libs/interfaces/average-stars-count.interface';

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
            
            throw new UnauthorizedException('auth.invalid.credentials');
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
    
    async getUserProfile(userId: number, profileId: number): Promise<[ ProfileWithRelatedTable, IAverageStarCount ]> {

        return this.prisma.$transaction([
            this.prisma.profile.findUnique({
                where: {
                    userId
                },
                include: {
                    user: true,
                    socialMedias: true
                }
            }),
            this.prisma.review.aggregate({
                where: {
                    profileId
                },
                _avg: {
                    starCount: true
                }
            })
        ]);
    }
    
    async updateUserProfile(userId: number, { bio, phone, address, web, socialMedias, cityId, avatarUrl }: UpdateProfileDto): Promise<void> {
        
        await this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                bio,
                phone,
                address,
                web,
                cityId,
                avatarUrl
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
