import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserKakaoDto {
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
  kakaoId: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  revokeToken: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
