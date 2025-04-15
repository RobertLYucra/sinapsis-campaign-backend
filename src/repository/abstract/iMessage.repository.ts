import { MessageStatus } from "src/infraestructure/enums/message-mapping.enum";
import { Message } from "src/domain/model/message.model";


export interface IMessageRepository {
    findMessagesByCampaign(idCampaign: number): Promise<Message[]>;
    createMessages(message: Partial<Message>[]): Promise<Message[]>;
    updateMessagesStatus(campaignId: number, currentStatus: MessageStatus, newStatus: MessageStatus): Promise<void>;
    countPendingMessages(campaignId: number): Promise<number>;
    findMessagesByCampaignAndStatus(campaignId: number, status: MessageStatus): Promise<Message[]>;
    updateMessage(message: Message): Promise<void>
}
