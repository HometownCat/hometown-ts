import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  userIp: string;

  // @IsUUID()
  // accessToken: string;

  // @IsUUID()
  // refreshToken: string;

  @IsNumber()
  status: number;
}
