import { User } from 'src/services/entities/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getOneByEmail(email: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.email = (:email)', { email })
      .addSelect('user.password')
      .getOne();

    return user;
  }

  async deleteOneById(userId: number): Promise<void> {
    await this.createQueryBuilder()
      .softDelete()
      .where('id = (:userId)', { userId })
      .execute();
  }
}
