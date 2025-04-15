import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MessagesResponse } from "src/domain/dto/response/message-response.dto";
import { FormatResponse } from "src/infraestructure/utils/format.response";
import { IMessageService } from "src/service/abstract/iMessage.service";


@ApiTags('messages')
@Controller('api/messages')
export class MessageController {
    constructor(
        @Inject('IMessageService')
        private readonly messageService: IMessageService,
    ) { }

    @Get(":idCampaign")
    @ApiResponse({
        status: 200,
        description: 'Lista de Mensajes por Campaña',
        type: FormatResponse,
    })
    @ApiOperation({ summary: 'Listar de Mensajes por Campaña' })
    @ApiParam({
        name: 'idCampaign',
        type: Number,
        description: 'ID de la campaña',
    })
    async getMEssages(@Param('idCampaign') idCampaign: number): Promise<FormatResponse<MessagesResponse[]>> {
        const messagesByCampaign = await this.messageService.getMessagesByCampaign(idCampaign);
        return {
            status: true,
            code: 200,
            message: 'Lista de Mensajes por Campaña',
            data: messagesByCampaign,
        };
    }
}
