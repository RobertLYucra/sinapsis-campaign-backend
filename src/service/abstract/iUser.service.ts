import { CreateUserDTO } from "src/domain/dto/request/create-user.dto";
import { UserResponse } from "src/domain/dto/response/user-response.dto";

export interface IUserService {
    getAllUsers(): Promise<UserResponse[]>;
    createUser(userData: CreateUserDTO): Promise<boolean>;
}