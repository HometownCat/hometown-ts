import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/services/entities/auth/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  async findAll(): Promise<Auth[]> {
    const auth = await this.authRepository.find();
    return auth;
  }
}
