import { AuthRepository } from './auth.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Auth } from 'src/services/entities/auth/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@Src/services/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
  ) {}
  // async findAll(): Promise<Auth[]> {
  //   const auth = await this.authRepository.find();
  //   return auth;
  // }
}
