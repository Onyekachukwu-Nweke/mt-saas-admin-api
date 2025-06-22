import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantWithUserDto {
  @ApiProperty({
    example: 'Obiora-Sons',
    description: 'Name of the tenant',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: CreateUserDto,
    required: true,
  })
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
