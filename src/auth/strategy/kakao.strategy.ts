import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpMessage } from '@Src/auth/enum/httpMessage.enum';
import { ConfigService } from '@Src/config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import * as path from 'path';

dotenv.config();

export class KaKaoStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, provider, done) {
    const profileJson = profile._json;
    const kakaoAccount = profileJson.kakao_account;

    const payload = {
      provider,
      name: kakaoAccount.profile.nickname,
      kakaoId: profileJson.id,
      email:
        kakaoAccount.has_email && !kakaoAccount.email_needs_agreement
          ? kakaoAccount.email
          : null,
      accessToken,
      refreshToken,
      gender: kakaoAccount.gender,
    };
    return payload;
    // done(null, payload);
  }
}
