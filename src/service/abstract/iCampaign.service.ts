import { CreateCampaignDTO } from "src/domain/dto/request/create-campaign.dto";
import { FilterCampaignDTO } from "src/domain/dto/request/filter-campaign.dto";
import { CampaignResponse } from "src/domain/dto/response/campaign-response.dto";
import { UpdateCampaignDTO } from "src/domain/dto/request/update-campaign.dto";

export interface ICampaignService {
    getAllCampaign(): Promise<CampaignResponse[]>;
    updateCampaign(campaignDTO: UpdateCampaignDTO): Promise<boolean>;
    getAllCampaignFilter(filterDTO: FilterCampaignDTO): Promise<CampaignResponse[]>;
    deleteCampaign(idCampaign: number): Promise<boolean>;
    createCampaign(campaignData: CreateCampaignDTO): Promise<boolean>;
    updateCampaignCreateMessages(Idcampaign: number): Promise<boolean> ;
}