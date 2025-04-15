export interface MessagesResponse {   
    CampaignId: number;
    campaigName:string
    idMessage?: number;
    phone: string;
    messageText: string;
    shippingStatus: number;
    shippingStatusName: string;
    processDate?:Date;
    processHour?: string;
}