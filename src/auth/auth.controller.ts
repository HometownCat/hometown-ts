import { Controller, Get, HttpCode, Req, Res, UseGuards } from '@nestjs/common';
import { Auth } from 'src/services/entities/auth/auth.entity';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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
}
