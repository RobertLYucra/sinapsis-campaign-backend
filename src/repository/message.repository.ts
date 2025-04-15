import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/domain/model/message.model';
import { MessageStatus } from 'src/infraestructure/enums/message-mapping.enum';
import { IMessageRepository } from './abstract/iMessage.repository';

@Injectable()
export class MessageRepository implements IMessageRepository {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) { }

    async findMessagesByCampaign(idCampaign: number): Promise<Message[]> {

        const messages = await this.messageRepository.find({
            where: { campaign_id: idCampaign },
            relations: ['campaign']
        });
        return messages;
    }


    async createMessages(message: Partial<Message>[]): Promise<Message[]> {
        try {
            const newmessages = this.messageRepository.create(message);
            return await this.messageRepository.save(newmessages);
        } catch (error) {
            console.error('Error al crear el Campaña:', error);
            return [];
        }
    }

    async updateMessagesStatus(campaignId: number, currentStatus: MessageStatus, newStatus: MessageStatus): Promise<void> {
        await this.messageRepository.update(
            { campaign: { id: campaignId }, shipping_status: currentStatus },
            { shipping_status: newStatus }
        );
    }


    async countPendingMessages(campaignId: number): Promise<number> {
        return this.messageRepository.count({
            where: { campaign: { id: campaignId }, shipping_status: MessageStatus.PENDING }
        });
    }

    async findMessagesByCampaignAndStatus(campaignId: number, status: MessageStatus): Promise<Message[]> {
        return await this.messageRepository.find({
            where: {
                campaign_id: campaignId,
                shipping_status: status
            }
        });
    }

    async updateMessage(message: Message): Promise<void> {
        await this.messageRepository.save(message);
    }

}