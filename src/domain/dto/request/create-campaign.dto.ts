import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDTO {
    @ApiProperty({
        description: 'Nombre de la campaña',
        example: 'Campaña de Verano'
    })
    name: string;

    @ApiProperty({
        description: 'Lista de teléfonos separados por comas',
        example: '1234567890,0987654321'
    })
    phoneList: string;

    @ApiProperty({
        description: 'Texto del mensaje que se enviará',
        example: '¡Hola! Esta es una promoción exclusiva para ti.'
    })
    messageText: string;

    @ApiProperty({
        description: 'ID del usuario que crea la campaña',
        example: 4200
    })
    userId: number;
}