import { AuthRepository } from './auth.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Auth } from 'src/services/entities/auth/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Src/services/entities/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '@Src/services/api/user/user.service';
import CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { UserKakaoDto } from './dto/user.kakao.dto';
import { SnsToken } from '@Src/services/entities/auth/sns.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
    @Inject('SNS_REPOSITORY')
    private snsRepository: Repository<SnsToken>,

    private jwtService: JwtService,
  ) {}
  // async findAll(): Promise<Auth[]> {
  //   const auth = await this.authRepository.find();
  //   return auth;
  // }

  async validateUser(email: string): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = {
      user_no: user.id,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      user_no: user.id,
      user_token: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '50m',
    });

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await this.userRepository
      .createQueryBuilder()
      .update(SnsToken)
      .set({ revokeToken: token })
      .where(`snsId = ${user.id}`)
      .execute();
    return refresh_token;
  }

  onceToken(user_profile: any) {
    const payload = {
      user_email: user_profile.user_email,
      user_nick: user_profile.user_nick,
      user_provider: user_profile.user_provider,
      user_token: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async kakaoLogin(userKakaoDto: UserKakaoDto): Promise<UserKakaoDto> {
    const {
      provider,
      kakaoId,
      name,
      email,
      accessToken,
      refreshToken,
      gender,
      code,
    } = userKakaoDto;

    const user = await this.snsRepository
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where('user.username = :name', { name })
      .getOne();

    if (!user) {
      try {
        await this.userRepository.save({
          snsId: kakaoId,
          email,
          username: name,
        });
      } catch (e) {
        if (e.code === '23505') {
          throw new ConflictException('Existing User');
        } else {
          throw new InternalServerErrorException();
        }
      }
    } else {
      return {
        provider,
        name,
        email,
        kakaoId,
        accessToken,
        refreshToken,
        gender,
        code,
      };
    }
    await this.snsRepository.save({
      snsId: kakaoId,
      accessToken,
      revokeToken: refreshToken,
    });

    // console.log(
    //   provider,
    //   name,
    //   email,
    //   kakaoId,
    //   accessToken,
    //   refreshToken,
    //   gender,
    // );

    return userKakaoDto;
  }
}
