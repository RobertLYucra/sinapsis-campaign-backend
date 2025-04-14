import { BadRequestException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCampaignDTO {
    @ApiProperty({
        description: 'Fecha Inicio',
        example: '2025-12-12'
    })
    startDate: Date;

    @ApiProperty({
        description: 'Fecha Fin',
        example: '2025-12-15'
    })
    endDate: Date;

    @ApiProperty({
        description: 'Estado de Campaña',
        example: 1
    })
    statusId: number;


    validateDateRange(): void {
        if (!this.startDate || !this.endDate) {
            throw new BadRequestException('Error de fecha');
        }
        if (this.startDate > this.endDate) {
            throw new BadRequestException('La fecha de inicio no puede ser mayor que la fecha de fin');
        }
    }
}