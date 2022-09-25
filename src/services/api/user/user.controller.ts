import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/services/entities/user/user.entity';
import { UserService } from './user.service';
import * as response from '../../../common/tools/response.tool';
import { CreateUserDto } from './dtos/create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    response.success(res, users);
  }

  @Get('/:id')
  async findOne(@Res() res: Response, @Param('id') userId: number) {
    await this.userService.findOne(userId, (err, result) => {
      if (err) {
        response.error(res, err);
      } else {
        response.success(res, result);
      }
    });
  }

  @Post('/signUp')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.signUp(createUserDto);
  }
}
