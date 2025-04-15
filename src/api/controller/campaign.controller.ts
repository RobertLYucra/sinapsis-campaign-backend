import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormatResponse } from 'src/infraestructure/utils/format.response';
import { CreateCampaignDTO } from 'src/domain/dto/request/create-campaign.dto';
import { FilterCampaignDTO } from 'src/domain/dto/request/filter-campaign.dto';
import { UpdateCampaignDTO } from 'src/domain/dto/request/update-campaign.dto';
import { CampaignResponse } from 'src/domain/dto/response/campaign-response.dto';
import { ICampaignService } from 'src/service/abstract/iCampaign.service';

@ApiTags('campaign')
@Controller('api/campaign')
export class CampaignController {
    userService: any;

    constructor(
        @Inject('ICampaignService')
        private readonly campaignService: ICampaignService,) { }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Lista de Campañas',
        type: FormatResponse,
    })
    @ApiOperation({ summary: 'Listar todas las campañas' })
    async getAllCampaigns(): Promise<FormatResponse<CampaignResponse[]>> {
        const listAllCampaign = await this.campaignService.getAllCampaign();
        return {
            status: true,
            code: 200,
            message: 'Lista de campañas',
            data: listAllCampaign,
        };
    }

    @Post("/filter")
    @ApiResponse({
        status: 200,
        description: 'Lista de Campañas',
        type: FormatResponse,
    })
    @ApiOperation({ summary: 'Obtener campañas por rango de fecha' })
    async getCampaignFilter(@Body() filterCampaign: FilterCampaignDTO): Promise<FormatResponse<CampaignResponse[]>> {

        try {
            const listAllCampaign = await this.campaignService.getAllCampaignFilter(filterCampaign);
            return {
                status: true,
                code: 200,
                message: 'Lista de campañas',
                data: listAllCampaign,
            };
        } catch (error) {
            console.error('Error al actualizar la Campaña:', error);
            throw new HttpException(
                {
                    status: false,
                    code: 500,  // Aquí lanzamos el código 500 de respuesta
                    message: 'Error al traer lista de  Campañas por filtro',
                    data: undefined,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,  // Esto asegura que el código HTTP sea 500
            );
        }
    }

    @Post()
    @ApiResponse({ type: FormatResponse })
    @ApiOperation({ summary: 'Crear campaña' })
    @ApiBody({ type: CreateCampaignDTO })
    async createCampaign(@Body() newCampaign: CreateCampaignDTO) {
        try {
            const createdCampaign = await this.campaignService.createCampaign(newCampaign);

            return {
                status: createdCampaign,
                code: createdCampaign ? 201 : 500,
                message: createdCampaign ? 'Campaña creado con éxito' : 'Error al crear Campaña',
                data: createdCampaign,
            };
        } catch (error) {
            console.error('Error al crear el Campaña:', error);
            return {
                status: false,
                code: 500,
                message: 'Error al crear el Campaña',
                data: undefined,
            };
        }
    }

    @Put()
    @ApiResponse({ type: FormatResponse })
    @ApiOperation({ summary: 'Actualizar campaña' })
    @ApiBody({ type: UpdateCampaignDTO })
    async updateCampaign(@Body() campaignParam: UpdateCampaignDTO) {
        try {

            const updateCampaign = await this.campaignService.updateCampaign(campaignParam);

            return {
                status: updateCampaign,
                code: updateCampaign ? 200 : 500,
                message: updateCampaign ? 'Campaña actualizado con éxito' : 'Error al actualizar Campaña',
                data: updateCampaign,
            };
        } catch (error) {
            console.error('Error al actualizar la Campaña:', error);
            throw new HttpException(
                {
                    status: false,
                    code: 500,  // Aquí lanzamos el código 500 de respuesta
                    message: 'Error al actualizar la Campaña',
                    data: undefined,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,  // Esto asegura que el código HTTP sea 500
            );
        }
    }


    @Delete("/:idCampaign")
    @ApiResponse({
        status: 200,
        description: 'Eliminar campaña',
        type: FormatResponse,
    })
    @ApiParam({
        name: 'idCampaign',
        type: Number,
        description: 'ID de la campaña',
    })
    @ApiOperation({ summary: 'Eliminar una campaña' })
    async deleteCampaign(@Param('idCampaign') idCampaign: number) {

        const messagesByCampaign = await this.campaignService.deleteCampaign(idCampaign);

        return {
            status: messagesByCampaign,
            code: messagesByCampaign ? 200 : 500,
            message: messagesByCampaign ? 'Campaña eliminada' : "Error al eliminar campaña",
            data: messagesByCampaign,
        };
    }

    
    @Get("/notificar/:idCampaign")
    @ApiResponse({
        status: 200,
        description: 'Notificar campaña',
        type: FormatResponse,
    })
    @ApiParam({
        name: 'idCampaign',
        type: Number,
        description: 'ID de la campaña',
    })
    @ApiOperation({ summary: 'Enviar mensaje de la campaña a los números' })
    async sendMeesagesNotificacions(@Param('idCampaign') idCampaign: number) {
        const messagesByCampaign = await this.campaignService.updateCampaignCreateMessages(idCampaign);
        return {
            status: messagesByCampaign,
            code: messagesByCampaign ? 200 : 500,
            message: messagesByCampaign ? 'Campaña notificada' : "Error al notificar campaña",
            data: messagesByCampaign,
        };
    }
}