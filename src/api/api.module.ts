import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { Campaign } from 'src/domain/model/campaign.model';
import { Message } from 'src/domain/model/message.model';
import { UserService } from 'src/service/user.service';
import { UserRepository } from 'src/repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, Campaign, Message])],
    controllers: [UsersController],
    providers: [
        //Services
        {
            provide: "IUserService",
            useClass: UserService
        },
       

        //Repository
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },
       
    ],
})
export class ApiModule { }
