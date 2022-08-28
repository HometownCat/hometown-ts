import { Controller, Get, HttpCode } from '@nestjs/common';
import { Auth } from './auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/all')
  @HttpCode(200)
  async findAll(): Promise<Auth[]> {
    return await this.authService.findAll();
  }
}
