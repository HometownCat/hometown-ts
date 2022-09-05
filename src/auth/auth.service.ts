import { AuthRepository } from './auth.repository';
import { Injectable } from '@nestjs/common';
import { Auth } from 'src/services/entities/auth/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  async findAll(): Promise<Auth[]> {
    const auth = await this.authRepository.find();
    return auth;
  }
}
