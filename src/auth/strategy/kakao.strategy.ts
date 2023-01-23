import * as dotenv from 'dotenv';
import { ConfigService } from '@Src/config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

dotenv.config();

export class KaKaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(configService: ConfigService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const kakaoAccount = profileJson.kakao_account;

    const payload = {
      provider: profile.provider,
      name: kakaoAccount.profile.nickname,
      kakaoId: profileJson.id,
      email:
        kakaoAccount.has_email && !kakaoAccount.email_needs_agreement
          ? kakaoAccount.email
          : null,
      accessToken,
      revokeToken: refreshToken,
      gender: kakaoAccount.gender,
    };
    console.log(payload);

    return payload;
    // done(null, payload);
  }
}
