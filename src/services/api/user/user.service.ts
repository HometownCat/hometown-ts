import * as bcrypt from 'bcrypt';
import HttpError from 'src/common/exceptions/http.exception';

import { HttpStatus, Injectable } from '@nestjs/common';

// import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/services/entities/user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'hometown')
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}
