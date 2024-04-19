import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/createUser.input';
import { CheckUserInput } from './dto/checkUser.input';
import { LoginInput } from './dto/login.input';
import { IUserServiceRetrun } from './interface/user-service.interface';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userSrvice: UsersService, //
  ) {}

  @Post('check') // 회원가입 중복 체크
  async checkUser(@Body() checkUserInput: CheckUserInput): Promise<string> {
    const result = await this.userSrvice.checkBeforeCreate(checkUserInput);
    return result;
  }

  @Post('join') // 회원가입
  async createUser(
    @Body('form') createUserInput: CreateUserInput,
  ): Promise<IUserServiceRetrun> {
    return this.userSrvice.create({ createUserInput });
  }

  @Post('login') // 로그인
  async login(
    @Body('form') loginInput: LoginInput,
  ): Promise<IUserServiceRetrun> {
    return this.userSrvice.login({ loginInput });
  }
}
