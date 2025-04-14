

import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './abstract/iUser.service';
import { CreateUserDTO } from 'src/domain/dto/request/create-user.dto';
import { UserResponse } from 'src/domain/dto/response/user-response.dto';
import { IUserRepository } from 'src/repository/abstract/iUser.repository';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async createUser(userData: CreateUserDTO): Promise<boolean> {
        return await this.userRepository.createUser(userData);
    }

    async getAllUsers(): Promise<UserResponse[]> {
        // Obtener todos los usuarios de la base de datos
        const allUsers = await this.userRepository.findAll();

        // Crear un array de respuestas con la información del usuario
        const userResponse: UserResponse[] = allUsers.map(x => {
            const userDto: UserResponse = {
                idUser: x.id,
                username: x.username
            };
            return userDto;
        });

        return userResponse;
    }

}