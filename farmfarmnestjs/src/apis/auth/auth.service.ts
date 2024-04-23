import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceCheckInput,
  IAuthServiceCreate,
  IAuthServiceLogin,
  IAuthServiceMyInfoLogin,
} from './interfaces/auth-service.interface';
import { User } from '../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  findOneByUserId({ user_id }: { user_id: string }): Promise<Auth> {
    return this.authRepository.findOne({
      where: { user_id },
      relations: ['user'],
    });
  }

  findOneByUid({ user_id }: { user_id: string }): Promise<Auth> {
    return this.authRepository.findOne({
      where: {
        user: { id: user_id },
      },
      relations: ['user'],
    });
  }

  async hashPw({ user_pw }: { user_pw: string }): Promise<string> {
    const salt = Number(this.configService.get<string>('SALT'));
    return await bcrypt.hash(user_pw, salt);
  }

  async checkUser({ checkUserInput }: IAuthServiceCheckInput): Promise<string> {
    const { user_id, ...inputs } = checkUserInput;
    const authResult = await this.findOneByUserId({ user_id });
    if (user_id && authResult)
      throw new ConflictException('이미 등록된 아이디 입니다.');
    const userResult = await this.usersService.findOneByInputInUser({
      inputs,
    });
    if (userResult) {
      if (userResult.user_email === inputs.user_email)
        throw new ConflictException('이미 등록된 이메일 입니다.');
      if (userResult.user_nick === inputs.user_nick)
        throw new ConflictException('이미 등록된 닉네임 입니다.');
    }
    return '사용 가능';
  }

  async saveToAuthAndUser({ createUserInput }: IAuthServiceCreate) {
    const { user_id, user_pw, ...userData } = createUserInput;
    const user = await this.usersService.createUser({ userData });
    const hashedPw = await this.hashPw({ user_pw });
    await this.authRepository.save({
      user_id,
      user_pw: hashedPw,
      user,
    });
    return user;
  }

  async create({ createUserInput }: IAuthServiceCreate): Promise<User> {
    const { user_id, user_email, user_nick, id } = createUserInput;
    if (!id) {
      const checkUserInput = { user_id, user_email, user_nick };
      await this.checkUser({ checkUserInput });
    }
    return this.saveToAuthAndUser({ createUserInput });
  }

  async login({ loginInput }: IAuthServiceLogin): Promise<User> {
    const { user_id, user_pw } = loginInput;
    const auth = await this.findOneByUserId({ user_id });
    if (!auth) throw new BadRequestException('로그인 실패');
    const isPwMath = await bcrypt.compare(user_pw, auth.user_pw);
    if (!isPwMath) throw new BadRequestException('로그인 실패');
    return auth.user;
  }

  myInfoLogin({ myInfoLogin }: IAuthServiceMyInfoLogin) {
    const { user_id } = myInfoLogin;
    return this.findOneByUid({ user_id });
  }
}
