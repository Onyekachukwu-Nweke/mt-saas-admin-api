import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Onyekachukwu',
    description: 'First name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Nweke',
    description: 'Last name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'onyekachukwu@saas.com',
    description: 'Email of the user',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
