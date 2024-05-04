import { CreateUserDto } from "src/libs/dtos/create-user.dto";

export interface IUsersService {

    createUser(data: CreateUserDto): Promise<any>;

    findUserById(id: number): Promise<any>;

    findUserByEmail(email: string): Promise<any>;
}