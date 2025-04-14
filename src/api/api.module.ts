import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { Campaign } from 'src/domain/model/campaign.model';
import { Message } from 'src/domain/model/message.model';
import { UserService } from 'src/service/user.service';
import { UserRepository } from 'src/repository/user.repository';
import { CampaignService } from 'src/service/campaign.service';
import { CampaignRepository } from 'src/repository/campaign.repository';
import { CampaignController } from './controller/campaign.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Campaign, Message])],
    controllers: [UsersController, CampaignController],
    providers: [
        //Services
        {
            provide: "IUserService",
            useClass: UserService
        },
        {
            provide: 'ICampaignService',
            useClass: CampaignService,
        },


        //Repository
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },
        {
            provide: 'ICampaignRepository',
            useClass: CampaignRepository,
        },
       
    ],
})
export class ApiModule { }
