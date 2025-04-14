import { FilterCampaignDTO } from "src/domain/dto/request/filter-campaign.dto";
import { Campaign } from "src/domain/model/campaign.model";
import { Message } from "src/domain/model/message.model";

export interface ICampaignRepository {
  findAll(): Promise<Campaign[]>;
  findAllFilter(filterCampaignDTO: FilterCampaignDTO): Promise<Campaign[]>;
  createCampaign(campaign: Partial<Campaign>): Promise<boolean>;
  findCampaignById(idCampaign: number): Promise<Campaign | null>;
  deleteCampaignById(campaign: Campaign): Promise<boolean>;
  updateCampaign(campaign: Partial<Campaign>): Promise<boolean>;
  updateCampaignCreateMessages(campaign: Partial<Campaign>, messages: Partial<Message>[]): Promise<boolean>;
}