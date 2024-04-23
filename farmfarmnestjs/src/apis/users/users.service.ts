import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUsersServiceCreateUser,
  IUsersServiceFindOneByInputInUser,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findOneByInputInUser({
    inputs,
  }: IUsersServiceFindOneByInputInUser): Promise<User> {
    return this.usersRepository.findOne({
      where: [
        // or 연산
        { user_email: inputs.user_email },
        { user_nick: inputs.user_nick },
      ],
    });
  }

  createUser({ userData }: IUsersServiceCreateUser): Promise<User> {
    return this.usersRepository.save(userData);
  }

  findOneByUid({ id }) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
