
import { CreateCampaignDTO } from 'src/domain/dto/request/create-campaign.dto';
import { FilterCampaignDTO } from 'src/domain/dto/request/filter-campaign.dto';
import { CampaignResponse } from 'src/domain/dto/response/campaign-response.dto';
import { UpdateCampaignDTO } from 'src/domain/dto/request/update-campaign.dto';
import { CampaignStatus, CampaignStatusName } from 'src/infraestructure/enums/campaign-status.enum';
import { MessageStatus } from 'src/infraestructure/enums/message-mapping.enum';
import { Campaign } from 'src/domain/model/campaign.model';
import { Message } from 'src/domain/model/message.model';
import { CampaignMapper } from './mapping/campaign.mapping';
import { ICampaignService } from './abstract/iCampaign.service';
import { ICampaignRepository } from 'src/repository/abstract/iCampaign.repository';
import { IUserRepository } from 'src/repository/abstract/iUser.repository';
import { IMessageRepository } from 'src/repository/abstract/iMessage.repository';
import { TwilioService } from 'src/infraestructure/configuration/twilio.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CampaignService implements ICampaignService {

    constructor(

        @Inject('ICampaignRepository')
        private readonly campaignRepository: ICampaignRepository,

        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,

        @Inject('IMessageRepository')
        private readonly messageRepository: IMessageRepository,

        private readonly twilioService: TwilioService,

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

    async updateCampaignCreateMessages(Idcampaign: number): Promise<boolean> {
        try {
            const campaign = await this.campaignRepository.findCampaignById(Idcampaign);

            if (!campaign || campaign.process_status !== CampaignStatus.PENDING) {
                return false;
            }

            // Cambiar a estado "En proceso"
            campaign.process_status = CampaignStatus.IN_PROCESS;
            const now = new Date();
            campaign.process_date = now;
            campaign.process_hour = now.toLocaleTimeString('en-GB');

            const phoneNumbers = campaign.phone_list.split(',');

            const mensajes: Partial<Message>[] = phoneNumbers
                .map(phone => phone.trim())
                .filter(phone => phone !== '')
                .map(phone => ({
                    campaign_id: campaign.id,
                    phone,
                    text: campaign.message_text,
                    shipping_status: MessageStatus.PENDING,
                    process_date: now,
                    process_hour: now.toLocaleTimeString('en-GB')
                }));

            if (mensajes.length == 0) {
                return false;
            }

            const create = await this.campaignRepository.updateCampaignCreateMessages(campaign, mensajes);
            if (create) {
                
                //Comentar uno de ellos:
                this.simulateMessageDelivery(Idcampaign, mensajes.length);

                //Envio por twilio
                //await this.sendMessagesWithTwilio(campaign.id);
            }

            return create;

        } catch (error) {
            console.error('Error updating campaign messages:', error);
            return false;
        }
    }

    private async simulateMessageDelivery(campaignId: number, messageCount: number): Promise<void> {
        try {
            const batchSize = 100;
            const messages = await this.messageRepository.findMessagesByCampaignAndStatus(campaignId, MessageStatus.PENDING);
    
            for (let i = 0; i < messages.length; i += batchSize) {
                const batch = messages.slice(i, i + batchSize);
    
                // Delay *antes* del procesamiento
                const batchDelay = 500 + Math.random() * 500;
                await this.delay(batchDelay);
    
                for (const message of batch) {
                    const isSent = Math.random() < 0.85;
                    message.shipping_status = isSent ? MessageStatus.SENT : MessageStatus.ERROR;
                }
    
                // Actualiza todo el batch al final (puedes paralelizar si quieres)
                await Promise.all(batch.map(msg => this.messageRepository.updateMessage(msg)));
            }
    
            await this.updateCampaignStatusIfComplete(campaignId);
        } catch (error) {
            console.error('Error in message delivery simulation:', error);
        }
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async updateCampaignStatusIfComplete(campaignId: number): Promise<void> {
        const pendingCount = await this.messageRepository.countPendingMessages(campaignId);
        if (pendingCount === 0) {
            const campaign = await this.campaignRepository.findCampaignById(campaignId);
            if (campaign) {
                campaign.process_status = 3; // 3-Finalizada
                await this.campaignRepository.updateCampaign(campaign);
            }
        }
    }

    /*No se pudo implementar twilio porque solo se enviaba a un numero (al mio +927676456),
        Se necesita upgrade  para eliminar esa restricción
    */

    private async sendMessagesWithTwilio(campaignId: number): Promise<void> {
        try {
            const messages = await this.messageRepository.findMessagesByCampaignAndStatus(
                campaignId,
                MessageStatus.PENDING
            );

            const smsList = messages.map((msg) => ({
                to: msg.phone.startsWith('+') ? msg.phone : `+${msg.phone}`,
                body: msg.text,
            }));

            const results = await this.twilioService.sendMessages(smsList);

            for (const message of messages) {
                const result = results.find(r => r.to === (message.phone.startsWith('+') ? message.phone : `+${message.phone}`));
                message.shipping_status = result?.success ? MessageStatus.SENT : MessageStatus.ERROR;
                await this.messageRepository.updateMessage(message);
            }

            await this.updateCampaignStatusToComplete(campaignId);

        } catch (error) {
            console.error('Error en envío real de mensajes:', error);
        }
    }

    private async updateCampaignStatusToComplete(campaignId: number): Promise<void> {
        const campaign = await this.campaignRepository.findCampaignById(campaignId);
        if (campaign) {
            campaign.process_status = CampaignStatus.COMPLETED;
            await this.campaignRepository.updateCampaign(campaign);
        }
    }
}
