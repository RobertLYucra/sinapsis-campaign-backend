import { MessagesResponse } from "src/domain/dto/response/message-response.dto";

export interface IMessageService {
    getMessagesByCampaign(idCampaign: number): Promise<MessagesResponse[]>;
}