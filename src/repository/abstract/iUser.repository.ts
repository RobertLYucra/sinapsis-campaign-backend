import { User } from "src/domain/model/user.model";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    createUser(userData: Partial<User>): Promise<boolean>;
    findOneUser(idUser: number): Promise<User>;
}
