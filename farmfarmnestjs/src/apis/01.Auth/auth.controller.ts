import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CheckUserInput,
  CreateUserInput,
  LoginInput,
  MyInfoLoginInput,
} from './dto/auth-container.dto';
import { User } from '../02.Users/entities/users.entity';
import { Auth } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check') // 중복체크
  checkUser(@Body() checkUserInput: CheckUserInput): Promise<string> {
    return this.authService.checkUser({ checkUserInput });
  }

  @Post('join') // 회원가입 & 정보수정
  createUser(@Body('form') createUserInput: CreateUserInput): Promise<User> {
    return this.authService.create({ createUserInput });
  }

  @Post('login') // 로그인
  login(@Body('form') loginInput: LoginInput): Promise<User> {
    return this.authService.login({ loginInput });
  }

  @Post('myInfoLogin') // 내정보 수정 로그인 => 프론트에서 uid만 가지고 있어서 일반 로그인이랑 방법이달라짐
  myInfoLogin(@Body('form') myInfoLogin: MyInfoLoginInput): Promise<Auth> {
    return this.authService.myInfoLogin({ myInfoLogin });
  }
}
