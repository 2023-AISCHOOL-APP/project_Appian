import { Injectable } from '@nestjs/common';
import { IUsersServiceCreate } from './users.controller';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  create({
    user_id,
    user_pw,
    user_nick,
    user_name,
    user_email,
    user_phone,
    user_address,
    user_type,
  }: IUsersServiceCreate) {
    return this.usersRepository.save({
      user_id,
      user_pw,
      user_nick,
      user_name,
      user_email,
      user_phone,
      user_address,
      user_type,
    });
  }
}
