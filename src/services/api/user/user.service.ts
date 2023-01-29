import { ICallback } from './../../../interfaces/common/common.interface';
import { CreateUserDto } from './dtos/create.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import * as async from 'async';
import * as _ from 'lodash';
// import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/services/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  //constructor(private userRepository: UserRepository) {}
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  async findUserById(id: number): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  async findOne(userId: number, callback: ICallback) {
    async.waterfall(
      [
        callback => callback(null, userId),
        (userId, callback: ICallback) => {
          this.userRepository
            .findOne({
              where: {
                id: userId,
              },
              relations: {
                board: {
                  boardImage: true,
                  boardComment: true,
                },
              },
            })
            .then(result => {
              callback(null, result);
            })
            .catch(err => {
              console.log(err);
              callback(err);
            });
        },
      ],
      callback,
    );
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(username, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private checkUserExists(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  private saveUser(
    username: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // TODO: DB 연동 후 구현
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    // await this.emailService.sendMemberJoinVerification(
    //   email,
    //   signupVerifyToken,
    // );
  }
}
