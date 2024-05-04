import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUsersService } from './users';
import { CreateUserDto } from 'src/libs/dtos/create-user.dto';
import { AuthDto } from 'src/libs/dtos/auth.dto';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ERole } from '.prisma/client';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService implements IUsersService {

    constructor(private readonly prisma: PrismaService) {
    }
    
    async createUser({ email, fullName, password }: CreateUserDto): Promise<{ id: number, roles: ERole[] }> {
        const { id, roles } = await this.prisma.user.create({
            data: {
                email,
                fullName,
                password,
                roles: [ERole.USER]
            }
        });
        return {
            id,
            roles
        };
    }

    async findUserById(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async findUserByEmail(email: string): Promise<{ id: number, roles: ERole[], hashedPassword: string }> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw new UnauthorizedException('auth.invalid_credentials');
        }
        return {
            id: user.id,
            roles: user.roles,
            hashedPassword: user.password
        };
    }
}
