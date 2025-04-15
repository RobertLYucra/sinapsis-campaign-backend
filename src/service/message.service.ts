

import { Inject, Injectable } from '@nestjs/common';
import { Message } from 'src/domain/model/message.model';
import { IMessageService } from './abstract/iMessage.service';
import { IMessageRepository } from 'src/repository/abstract/iMessage.repository';
import { MessagesResponse } from 'src/domain/dto/response/message-response.dto';
import { MessageMapper } from './mapping/message.mapping';

@Injectable()
export class MessageService implements IMessageService {

    constructor(
        @Inject("IMessageRepository")
        private readonly messageRepository: IMessageRepository
    ) { }

    async getMessagesByCampaign(idCampaign: number): Promise<MessagesResponse[]> {
        const messagesByCampaign: Message[] = await this.messageRepository.findMessagesByCampaign(idCampaign);
        return messagesByCampaign.map(MessageMapper.toResponseMessage);
    }
}
