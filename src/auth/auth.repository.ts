import { EntityRepository, Repository } from 'typeorm';
import { Auth } from '../api/entities/auth/auth.entity';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
