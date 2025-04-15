import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/model/user.model';
import { CampaignController } from './controller/campaign.controller';
import { Campaign } from 'src/domain/model/campaign.model';
import { MessageController } from './controller/message.controller';
import { Message } from 'src/domain/model/message.model';
import { UserService } from 'src/service/user.service';
import { CampaignService } from 'src/service/campaign.service';
import { MessageService } from 'src/service/message.service';
import { UserRepository } from 'src/repository/user.repository';
import { CampaignRepository } from 'src/repository/campaign.repository';
import { MessageRepository } from 'src/repository/message.repository';
import { TwilioService } from 'src/infraestructure/configuration/twilio.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Campaign, Message])],
    controllers: [UsersController, CampaignController, MessageController],
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
        {
            provide: "IMessageService",
            useClass: MessageService
        },

        TwilioService,


        //Repository
        {
            provide: "IUserRepository",
            useClass: UserRepository
        },
        {
            provide: 'ICampaignRepository',
            useClass: CampaignRepository,
        },
        {
            provide: "IMessageRepository",
            useClass: MessageRepository
        },
    ],
})
export class ApiModule { }
