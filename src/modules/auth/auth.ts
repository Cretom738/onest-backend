import { AuthDto } from "src/modules/auth/dtos/auth.dto";
import { CreateUserDto } from "src/modules/users/dtos/create-user.dto";
import { AuthSuccessDto } from "src/modules/auth/dtos/auth-success.dto";

export interface IAuthService {

    register(data: CreateUserDto): Promise<AuthSuccessDto>;

    login(data: AuthDto): Promise<AuthSuccessDto>;

    logout(deviceId: number): Promise<void>;

    refresh(refreshToken: string): Promise<AuthSuccessDto>;
}