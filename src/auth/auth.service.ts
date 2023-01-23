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
import { UserSns } from '@Src/services/entities/auth/sns.entity';
import { UserNaverDto } from './dto/user.naver.dto';
import HttpError from '@Src/common/exceptions/http.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<Auth>,
    @Inject('SNS_REPOSITORY')
    private snsRepository: Repository<UserSns>,

    private jwtService: JwtService,
  ) {}
  // async findAll(): Promise<Auth[]> {
  //   const auth = await this.authRepository.find();
  //   return auth;
  // }

  async naverValidateUser(userNaverDto: UserNaverDto): Promise<UserNaverDto> {
    const { provider, naverId, name, email, accessToken, revokeToken } =
      userNaverDto;

    const user = await this.snsRepository
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where('user.snsId = :snsId', { snsId: naverId })
      .andWhere('user.email = :email', { email })
      .getOne();

    if (!user) {
      try {
        Promise.all([
          await this.userRepository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
              snsId: naverId,
              email,
              username: name,
            })
            .orUpdate(['email', 'username'])
            .execute(),
          await this.snsRepository
            .createQueryBuilder()
            .insert()
            .into(UserSns)
            .values({
              snsId: naverId,
              provider,
              accessToken,
              revokeToken,
            })
            .orUpdate(['provider', 'accessToken', 'revokeToken'])
            .execute(),
        ]);

        return null;
      } catch (e) {
        throw new InternalServerErrorException();
      }
    }
    return userNaverDto;
  }

  async createLoginToken(snsId: string) {
    const payload = {
      snsId,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(snsId: string) {
    const payload = {
      snsId,
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
      .update(UserSns)
      .set({ revokeToken: token })
      .where(`snsId = ${snsId}`)
      .execute();
    return refresh_token;
  }

  onceToken({ email, name }) {
    const payload = {
      email,
      name,
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
      revokeToken,
      gender,
      code,
    } = userKakaoDto;

    const user = await this.snsRepository
      .createQueryBuilder()
      .select('*')
      .from(User, 'user')
      .where('user.snsId = :snsId', { snsId: kakaoId })
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
        revokeToken,
        gender,
        code,
      };
    }
    try {
      console.log({
        snsId: kakaoId,
        provider: provider,
        accessToken,
        revokeToken,
      });

      await this.snsRepository
        .createQueryBuilder()
        .insert()
        .into(UserSns)
        .values({
          snsId: kakaoId,
          provider: provider,
          accessToken,
          revokeToken,
        })
        .orUpdate(['provider', 'accessToken', 'revokeToken'])
        .execute();
    } catch (err) {
      throw new InternalServerErrorException();
    }
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
