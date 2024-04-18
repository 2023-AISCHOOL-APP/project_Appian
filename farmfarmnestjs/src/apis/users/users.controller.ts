import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userSrvice: UsersService, //
  ) {}

  @Post('join') // 회원가입
  async createUser(@Body('form') createUserInput: CreateUserInput) {
    return this.userSrvice.create({ createUserInput });
  }
}
