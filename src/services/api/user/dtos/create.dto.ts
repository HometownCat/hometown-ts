import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNumber()
  password: string;

  @IsString()
  userIp: string;

  @IsNumber()
  status: number;
}
