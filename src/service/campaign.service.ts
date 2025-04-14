
import { Inject, Injectable } from '@nestjs/common';
import { CreateCampaignDTO } from 'src/domain/dto/request/create-campaign.dto';
import { FilterCampaignDTO } from 'src/domain/dto/request/filter-campaign.dto';
import { CampaignResponse } from 'src/domain/dto/response/campaign-response.dto';
import { UpdateCampaignDTO } from 'src/domain/dto/request/update-campaign.dto';
import { CampaignStatus } from 'src/infraestructure/enums/campaign-status.enum';
import { Campaign } from 'src/domain/model/campaign.model';
import { IUserRepository } from 'src/repository/abstract/iUser.repository';
import { ICampaignRepository } from 'src/repository/abstract/iCampaign.repository';
import { CampaignMapper } from './mapping/campaign.mapping';
import { ICampaignService } from './abstract/iCampaign.service';


@Injectable()
export class CampaignService implements ICampaignService {

    constructor(

        @Inject('ICampaignRepository')
        private readonly campaignRepository: ICampaignRepository,

        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,

    ) { }

    async getAllCampaign(): Promise<CampaignResponse[]> {
        const allCampaigns = await this.campaignRepository.findAll();
        return allCampaigns.map(CampaignMapper.toResponseCampaign);
    }

    async updateCampaign(campaignDTO: UpdateCampaignDTO): Promise<boolean> {

        try {
            const campaign = await this.campaignRepository.findCampaignById(campaignDTO.idCampaign);

            if (campaign == null || campaign.process_status !== 1) {
                return false
            }
            campaign.user = campaign.user_id != campaignDTO.userId ? await this.userRepository.findOneUser(campaignDTO.userId) : campaign.user;
            campaign.name = campaignDTO.name;
            campaign.user = campaign.user;
            campaign.phone_list = campaignDTO.phoneList;
            campaign.message_text = campaignDTO.messageText;
            campaign.process_date = new Date();
            campaign.process_hour = new Date().toLocaleTimeString('en-GB');
            return this.campaignRepository.updateCampaign(campaign);

        } catch (error) {
            return false;
        }
    }

    async getAllCampaignFilter(filterDTO: FilterCampaignDTO): Promise<CampaignResponse[]> {

        const allCampaigns = await this.campaignRepository.findAllFilter(filterDTO);
        return allCampaigns.map(CampaignMapper.toResponseCampaign);
    }

    async deleteCampaign(idCampaign: number): Promise<boolean> {

        const campaign = await this.campaignRepository.findCampaignById(idCampaign);

        if (!campaign || campaign.process_status !== 1) {
            return false;
        }

        return this.campaignRepository.deleteCampaignById(campaign)
    }

    async createCampaign(campaignData: CreateCampaignDTO): Promise<boolean> {

        try {
            // Obtener el usuario a partir del ID
            const user = await this.userRepository.findOneUser(campaignData.userId);

            if (!user) {
                throw new Error('User not found');
            }

            // Crear la nueva campaña sin el campo 'id' ya que será generado automáticamente
            const campaign = new Campaign();
            campaign.name = campaignData.name;
            campaign.phone_list = campaignData.phoneList;
            campaign.message_text = campaignData.messageText;
            campaign.user = user;  // Asignamos el objeto 'user' en lugar de solo el ID
            campaign.process_date = new Date();
            campaign.process_hour = new Date().toLocaleTimeString('en-GB');
            campaign.process_status = CampaignStatus.PENDING;
            campaign.messages = [];  // Inicializamos con un array vacío de mensajes

            // Guardar la campaña en la base de datos
            return await this.campaignRepository.createCampaign(campaign);

        } catch (error) {
            console.error('Error al crear la campaña:', error);
            return false;  // Si ocurre un error, devolvemos 'false'
        }
    }
}