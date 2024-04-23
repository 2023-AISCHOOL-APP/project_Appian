import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersServiceFindOneByInputInUser } from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 회원가입 중복 체크용으로 사용 중
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
}
