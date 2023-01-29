import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserNaverDto {
  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string | null;

  @IsString()
  @IsNotEmpty()
  naverId: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  revokeToken: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
