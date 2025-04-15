import { MessageStatusName } from "src/infraestructure/enums/message-mapping.enum";
import { MessagesResponse } from "src/domain/dto/response/message-response.dto";
import { Message } from "src/domain/model/message.model";

export class MessageMapper {

    static toResponseMessage(x: Message): MessagesResponse {
        return {
            idMessage: x.id,
            campaigName: x.campaign.name,
            processDate: x.process_date,
            processHour: x.process_hour,
            shippingStatus: x.shipping_status,
            shippingStatusName: MessageStatusName[x.shipping_status],
            phone: x.phone,
            messageText: x.text,
            CampaignId: x.campaign.id,
        };
    }
}