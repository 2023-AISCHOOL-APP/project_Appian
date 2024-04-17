import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userSrvice: UsersService, //
  ) {}

  @Post('join') // 회원가입
  async createUser(@Body() form): Promise<User> {
    const {
      user_id,
      user_pw,
      user_nick,
      user_name,
      user_email,
      user_phone,
      user_address,
      user_type,
    } = form;

    console.log('로그인 시도', form);

    return await this.userSrvice.create({
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

export interface IUsersServiceCreate {
  user_id: string;
  user_pw: string;
  user_nick: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_address: string;
  user_type: number;
}
