import { CampaignStatus, CampaignStatusName } from "src/infraestructure/enums/campaign-status.enum";
import { CampaignResponse } from "src/domain/dto/response/campaign-response.dto";
import { Campaign } from "src/domain/model/campaign.model";


export class CampaignMapper {

    static toResponseCampaign(x: Campaign): CampaignResponse {
        return {
            idCampaign: x.id,
            userId: x.user_id,
            name: x.name,
            processDate: x.process_date,
            processHour: x.process_hour,
            processStatus_id: x.process_status,
            processStatus_name: CampaignStatusName[x.process_status],
            phoneList: x.phone_list,
            messageText: x.message_text,
            userName: x.user?.username || '',
            send_status: x.process_status === CampaignStatus.PENDING ? 'Enviar' : 'Enviado',
            customer: x.user?.customer?.name || ''
        };
    }
}