import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'juanperez'
  })
  username: string;

  @ApiPropertyOptional({
    description: 'ID del cliente asociado al usuario',
    example: 101
  })
  customerId?: number;

  @ApiPropertyOptional({
    description: 'Estado del usuario (activo o inactivo)',
    example: true
  })
  status?: boolean;
}
