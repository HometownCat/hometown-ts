import { Auth } from 'src/services/entities/auth/auth.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {}
