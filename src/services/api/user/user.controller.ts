import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/services/entities/user/user.entity';
import { UserService } from './user.service';
import * as response from '../../../common/tools/response.tool';
import { CreateUserDto } from './dtos/create.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('유저')
@ApiSecurity('x-api-key')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '유저 리스트',
    description: '관리자에서 유저 리스트 조회 API',
  })
  @ApiOkResponse({
    description: '성공',
  })
  @Get('/list')
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    response.success(res, users);
  }

  @ApiOperation({
    summary: '유저 조회',
    description: '관리자에서 해당 유저 조회 API',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: '성공',
  })
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
