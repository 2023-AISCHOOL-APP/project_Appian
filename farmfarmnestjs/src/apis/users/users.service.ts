import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserServiceRetrun } from './interface/user-service.interface';
import * as bcrypt from 'bcrypt';
import { CheckUserInput } from './dto/user-container.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 여러 input에 대비하고, 한번만 검색하려고 범용적인 input방식 적용
  async findOneByInputInUser(input: CheckUserInput): Promise<User> {
    return await this.usersRepository.findOne({
      // or 조건문으로 3개 한번에 비교들어오는거 대처
      where: [
        { user_id: input.user_id },
        { user_email: input.user_email },
        { user_nick: input.user_nick },
      ],
    });
  }

  async checkUser(input: CheckUserInput): Promise<string> {
    const user = await this.findOneByInputInUser(input);
    if (!user) return '사용 가능';
    // 가입하기 누를 때 3개 한번에 비교들어오기 때문에 결과랑 인풋이랑 비교해야됨
    if (user.user_id === input.user_id)
      throw new ConflictException('이미 등록된 아이디 입니다.');
    if (user.user_email === input.user_email)
      throw new ConflictException('이미 등록된 이메일 입니다.');
    if (user.user_nick === input.user_nick)
      throw new ConflictException('이미 등록된 닉네임 입니다.');
  }

  async create({ createUserInput }): Promise<IUserServiceRetrun> {
    const { user_id, user_pw, user_email, user_nick } = createUserInput;

    await this.checkUser({ user_id, user_email, user_nick });

    const hashedPw = await bcrypt.hash(user_pw, 10); // 솔트 가리자
    const userData = { ...createUserInput, user_pw: hashedPw };
    const user = await this.usersRepository.save(userData);

    const returnData = {
      message: '회원가입 성공',
      user_id: user.user_id,
      user_nick: user.user_nick,
      user_type: user.user_type,
    };
    return returnData;
  }

  async login({ loginInput }): Promise<IUserServiceRetrun> {
    const { user_id, user_pw } = loginInput;
    const user = await this.findOneByInputInUser({ user_id });
    if (!user) throw new BadRequestException('로그인 실패');
    const isPwMatch = await bcrypt.compare(user_pw, user.user_pw);
    if (!isPwMatch) throw new BadRequestException('로그인 실패');
    const returnData = {
      message: '로그인 성공',
      user_id: user.user_id,
      user_nick: user.user_nick,
      user_type: user.user_type,
    };
    return returnData;
  }
}
