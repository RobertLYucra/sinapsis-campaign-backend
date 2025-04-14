import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/domain/dto/request/create-user.dto';
import { UserResponse } from 'src/domain/dto/response/user-response.dto';
import { FormatResponse } from 'src/infraestructure/utils/format.response';
import { IUserService } from 'src/service/abstract/iUser.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(
        @Inject('IUserService')
        private readonly userService: IUserService,
    ) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Lista de usuarios',
        type: FormatResponse,  // Se especifica el tipo de la respuesta
    })
    @ApiOperation({ summary: 'Lista de todos los usuarios' })
    async getUsers(): Promise<FormatResponse<UserResponse[]>> {
        const users = await this.userService.getAllUsers();

        return {
            status: true,
            code: 200,
            message: 'Lista de usuarios',
            data: users,  // Aquí van los usuarios obtenidos
        };
    }

    @Post()
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiResponse({
        type: FormatResponse,
    })
    @ApiBody({ type: CreateUserDTO })
    async createUser(@Body() newUser: CreateUserDTO): Promise<FormatResponse<CreateUserDTO>> {
        try {
            const createdUser = await this.userService.createUser(newUser);

            return {
                status: createdUser,
                code: createdUser ? 201 : 500,
                message: createdUser ? 'Usuario creado con éxito' : 'Error al crear usuario',
                data: newUser,
            };
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return {
                status: false,
                code: 500,
                message: 'Error al crear el usuario',
                data: undefined,
            };
        }
    }
}
