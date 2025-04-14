import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/domain/model/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from './abstract/iUser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async createUser(userData: Partial<User>): Promise<boolean> {
        try {
            const newUser = this.userRepository.create(userData);
            const createdUser = await this.userRepository.save(newUser);

            return createdUser != null;
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return false;
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOneUser(idUser: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({ where: { id: idUser } });

            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error al encontrar el usuario:', error);
            throw error;
        }
    }
}