import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';
import { ConfigService } from '@Src/config/config.service';

dotenv.config();

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const email = profile._json.email;
    const name = profile._json.nickname;
    const naverId = profile._json.id;
    const provider = profile.provider;
    const user_profile = {
      naverId,
      email,
      name,
      provider,
      accessToken,
      revokeToken: refreshToken,
    };

    return user_profile;
  }
}
