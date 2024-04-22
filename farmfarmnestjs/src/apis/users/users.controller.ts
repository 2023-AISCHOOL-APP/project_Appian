import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserServiceRetrun } from './interface/user-service.interface';
import {
  CheckUserInput,
  CreateUserInput,
  LoginInput,
  ReadMyInfoInput,
  UpdateMyInfoInput,
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

  @Post('read') // 마이페이지 자신 정보 읽어오기
  readMyInfo(@Body() readMyInfoInput: ReadMyInfoInput) {
    return this.userSrvice.readMyInfo({ readMyInfoInput });
  }

  @Post('update') // 마이페이지 정보 수정 업데이트
  updateMyInfo(@Body('form') updateMyInfoInput: UpdateMyInfoInput) {
    return this.userSrvice.updateMyInfo({ updateMyInfoInput });
  }
}
