import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpMessage } from '@Src/auth/enum/httpMessage.enum';
import { ConfigService } from '@Src/config/config.service';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: encodeURI(`${process.env.GOOGLE_CALLBACK_URL}`),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: any,
  ) {
    const { provider, id, displayName, emails } = profile;
    console.log(profile);

    const method = 'google.com';

    if (!provider) {
      return new Error(HttpMessage.NOT_FOUND_PROVIDER);
    } else {
      return {
        provider,
        id,
        displayName,
        email: emails[0].value,
        method,
      };
    }
  }
}
