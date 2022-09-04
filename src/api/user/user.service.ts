import * as bcrypt from 'bcrypt';
import HttpError from 'src/common/exceptions/http.exception';
// import { HttpMessage } from 'src/common/utils/errors/http-message.enum';

import { HttpStatus, Injectable } from '@nestjs/common';

// import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '../entities/user/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}
