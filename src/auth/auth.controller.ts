import {
  Controller,
  Get,
  HttpCode,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserKakaoDto } from './dto/user.kakao.dto';
import * as response from '../common/tools/response.tool';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Get('/all')
  // @HttpCode(200)
  // async findAll(): Promise<Auth[]> {
  //   // return await this.authService.findAll();
  // }

  // test

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt)
      res.redirect(
        `${process.env.HOST}:${process.env.PORT}/login/success/` + jwt,
      );
    else res.redirect(`${process.env.HOST}:${process.env.PORT}/login/failure`);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<any> {
    // do nothing
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query,
  ) {
    console.log('kakao login');
    const { code } = query;
    const kakaoResponse = await this.authService.kakaoLogin(
      req.user as UserKakaoDto,
    );

    response.success(res, { ...kakaoResponse, code });
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<any> {
    // do nothing
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query,
  ) {
    console.log('naver login');
  }
}
