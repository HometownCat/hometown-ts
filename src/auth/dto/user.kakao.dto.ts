import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserKakaoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string | null;

  @IsNumber()
  @IsNotEmpty()
  kakaoId: number;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
