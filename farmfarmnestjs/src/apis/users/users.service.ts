import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findOneByEmail({ user_email }) {
    return await this.usersRepository.findOne({ where: { user_email } });
  }

  async create({ createUserInput }) {
    const { user_id, user_email } = createUserInput;
    const user = await this.authService.findOneById({ user_id });
    if (user) throw new ConflictException('이미 등록된 아이디 입니다.');
    const email = await this.findOneByEmail({ user_email });
    if (email) throw new ConflictException('이미 등록된 이메일 입니다.');
  }
}
