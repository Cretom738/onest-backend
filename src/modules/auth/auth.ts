import { AuthDto } from "src/libs/dtos/auth.dto";
import { CreateUserDto } from "src/libs/dtos/create-user.dto";
import { IRefresh } from "src/libs/interfaces/refresh.interface";
import { AuthSuccessDto } from "src/libs/services/auth-success.dto";

export interface IAuthService {

    register(data: CreateUserDto): Promise<AuthSuccessDto>;

    login(data: AuthDto): Promise<AuthSuccessDto>;

    logout(deviceId: number): Promise<void>;

    refresh(data: IRefresh): Promise<AuthSuccessDto>;
}