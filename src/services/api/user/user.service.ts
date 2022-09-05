import * as bcrypt from 'bcrypt';
import HttpError from 'src/common/exceptions/http.exception';

import { HttpStatus, Inject, Injectable } from '@nestjs/common';

// import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/services/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  // constructor(
  //   @Inject('USER_REPOSITORY')
  //   private userRepository: Repository<User>,
  // ) {}
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}
