export interface CampaignResponse {   
    idCampaign: number;
    name?: string;
    processDate: Date;
    processHour: string;
    processStatus_id: number;
    processStatus_name?:string;
    phoneList?: string;
    messageText?:string
    userName?:string
    userId:number;
    send_status:string;
    customer:string
}