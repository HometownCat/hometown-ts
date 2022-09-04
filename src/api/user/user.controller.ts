import { Controller, Get } from '@nestjs/common';
import { async } from 'rxjs';
import { User } from '../entities/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/login')
  async login(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
