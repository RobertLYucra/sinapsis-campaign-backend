import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/domain/model/campaign.model';
import { Message } from 'src/domain/model/message.model';
import { DataSource } from 'typeorm';
import { FilterCampaignDTO } from 'src/domain/dto/request/filter-campaign.dto';
import { ICampaignRepository } from './abstract/iCampaign.repository';


@Injectable()
export class CampaignRepository  implements ICampaignRepository{
    constructor(
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>,
    
        private dataSource: DataSource,
    
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) { }

    async findAll(): Promise<Campaign[]> {
        return await this.campaignRepository.find({
            relations: ['user', 'user.customer'], order: {
                process_date: 'DESC',
                process_hour: 'DESC'
            }
        });
    }

    async findAllFilter(filterCampaignDTO: FilterCampaignDTO): Promise<Campaign[]> {
        const { startDate, endDate, statusId } = filterCampaignDTO;

        const query = this.campaignRepository.createQueryBuilder('campaign')
            .leftJoinAndSelect('campaign.user', 'user')
            .leftJoinAndSelect('user.customer', 'customer'); // Unir con la tabla de usuarios

        // Agregar filtro por fecha si los valores están presentes
        if (startDate && endDate) {
            query.andWhere('campaign.process_date BETWEEN :startDate AND :endDate', { startDate, endDate });
        } else if (startDate) {
            query.andWhere('campaign.process_date >= :startDate', { startDate });
        } else if (endDate) {
            query.andWhere('campaign.process_date <= :endDate', { endDate });
        }

        if (statusId && statusId !== 0) {
            query.andWhere('campaign.process_status = :statusId', { statusId });
        }

        query.orderBy('campaign.process_date', 'DESC')
            .addOrderBy('campaign.process_hour', 'DESC');

        return await query.getMany();
    }



    async createCampaign(campaign: Partial<Campaign>): Promise<boolean> {
        try {
            const newCampaign = this.campaignRepository.create(campaign);

            const createdCampaign = await this.campaignRepository.save(newCampaign);

            if (createdCampaign) {
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error al crear el Campaña:', error);
            return false;
        }
    }

    async findCampaignById(idCampaign: number): Promise<Campaign | null> {

        try {
            const campaign = await this.campaignRepository.findOne({
                where: { id: idCampaign },
                relations: ['user'],
            });

            if (!campaign) {
                console.warn(`Campaña con ID ${idCampaign} no encontrada`);
                return null;
            }

            return campaign;
        } catch (error) {
            console.error('Error al buscar la campaña:', error);
            throw error;
        }
    }

    async deleteCampaignById(campaign: Campaign): Promise<boolean> {

        try {
            await this.campaignRepository.remove(campaign);
            return true;
        } catch (error) {
            // Opcional: log del error
            console.error('Error al eliminar campaña:', error);
            return false;
        }
    }

    async updateCampaign(campaign: Partial<Campaign>): Promise<boolean> {

        try {
            const result = await this.campaignRepository.update(
                { id: campaign.id },
                campaign
            );
            return result.affected != null;
        } catch (error) {
            console.error('Error al actualizar la campaña:', error);
            return false;
        }
    }

    async updateCampaignCreateMessages(campaign: Partial<Campaign>, messages: Partial<Message>[]): Promise<boolean> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1. Actualiza la campaña
            await queryRunner.manager.update(Campaign, { id: campaign.id }, campaign);

            // 2. Guarda los mensajes
            const newMessages = queryRunner.manager.create(Message, messages);
            await queryRunner.manager.save(Message, newMessages);

            // 3. Confirmar si todo fue bien
            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            console.error('Error al actualizar la campaña y mensajes:', error);
            await queryRunner.rollbackTransaction();
            return false;
        } finally {
            await queryRunner.release();
        }
    }


}