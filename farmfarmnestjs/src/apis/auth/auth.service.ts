import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>, //
  ) {}

  async findOneById({ user_id }) {
    return await this.authRepository.findOne({ where: { user_id } });
  }

  async login({ loginInput }) {
    const { user_id, user_pw } = loginInput;

    const isIdAble = await this.findOneById({ user_id });
  }
}
