import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserServiceRetrun } from './interface/user-service.interface';
import {
  ChangeMyInfoInput,
  CheckUserInput,
  CreateUserInput,
  LoginInput,
} from './dto/user-container.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userSrvice: UsersService, //
  ) {}

  @Post('check') // 회원가입 중복 체크
  checkUser(@Body() checkUserInput: CheckUserInput): Promise<string> {
    const result = this.userSrvice.checkUser(checkUserInput);
    return result;
  }

  @Post('join') // 회원가입
  createUser(
    @Body('form') createUserInput: CreateUserInput,
  ): Promise<IUserServiceRetrun> {
    return this.userSrvice.create({ createUserInput });
  }

  @Post('login') // 로그인
  login(@Body('form') loginInput: LoginInput): Promise<IUserServiceRetrun> {
    return this.userSrvice.login({ loginInput });
  }

  @Post('change') // 마이페이지
  changeMyInfo(@Body() changeMyInfoInput: ChangeMyInfoInput) {
    return this.userSrvice.changeMyInfo({ changeMyInfoInput });
  }
}
