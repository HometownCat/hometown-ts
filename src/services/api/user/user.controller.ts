import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/services/entities/user/user.entity';
import { UserService } from './user.service';
import * as response from '../../../common/tools/response.tool';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    response.success(res, users);
  }
}
