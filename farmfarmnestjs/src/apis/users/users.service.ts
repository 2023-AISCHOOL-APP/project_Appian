import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { CheckUserInput } from './dto/checkUser.input';
import { IUserServiceRetrun } from './interface/user-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly dataSource: DataSource,
  ) {}

  async findOneById({ user_id }): Promise<Auth> {
    return await this.authRepository.findOne({ where: { user_id } });
  }

  async findOneByEmail({ user_email }): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ user_email }],
    });
  }
  async findOneByNick({ user_nick }): Promise<User> {
    return await this.usersRepository.findOne({
      where: [{ user_nick }],
    });
  }

  async findOneByUid({ uid }) {
    return await this.usersRepository.findOne({ where: [{ uid }] });
  }

  async checkBeforeCreate({
    user_id,
    user_email,
    user_nick,
  }: CheckUserInput): Promise<string> {
    if (user_id) {
      const user = await this.findOneById({ user_id });
      if (user) throw new ConflictException('이미 등록된 아이디 입니다.');
    }
    if (user_email) {
      const email = await this.findOneByEmail({ user_email });
      if (email) throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    if (user_nick) {
      const nick = await this.findOneByNick({ user_nick });
      if (nick) throw new ConflictException('이미 등록된 닉네임 입니다.');
    }
    return '사용 가능';
  }

  async create({ createUserInput }): Promise<IUserServiceRetrun> {
    const {
      user_id,
      user_pw,
      user_email,
      user_nick,
      user_name,
      user_phone,
      user_address,
    } = createUserInput;

    // 중복 체크
    await this.checkBeforeCreate({ user_id, user_email, user_nick });

    // Transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // User 테이블에 넣을 데이터
      const userData = this.usersRepository.create({
        user_email,
        user_nick,
        user_name,
        user_phone,
        user_address,
      });
      const user = await queryRunner.manager.save(userData);
      // User 테이블에 생성된 uid 가져오기
      const uid = await queryRunner.manager.findOne(User, {
        where: { user_email },
      });

      // 비번 암호화
      const hashedPw = await bcrypt.hash(user_pw, 10);
      // Auth 테이블에 넣을 데이터
      const authData = this.authRepository.create({
        user_id,
        user_pw: hashedPw,
        uid: uid,
      });
      const auth = await queryRunner.manager.save(authData);
      // 다 끝나면 커밋
      await queryRunner.commitTransaction();
      // 프론트에서 원한 반환 데이터와 형식
      const form = {
        user_id: auth.user_id,
        user_nick: user.user_nick,
        user_type: user.user_type,
      };
      return form;
    } catch (error) {
      // 오류나면 롤백
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('DB 오류');
    } finally {
      // DB 연결 해제
      await queryRunner.release();
    }
  }

  async login({ loginInput }) {
    const { user_id, user_pw } = loginInput;
    const auth = await this.findOneById({ user_id });
    if (!auth) throw new BadRequestException('로그인 실패');
    const isPwMatch = await bcrypt.compare(user_pw, auth.user_pw);
    if (!isPwMatch) throw new BadRequestException('로그인 실패');
    const uid = auth.uid;
    const user = await this.findOneByUid({ uid });
    const returnData = {
      message: '로그인 성공',
      user_id: auth.user_id,
      user_nick: user.user_nick,
      user_type: user.user_type,
    };
    return returnData;
  }
}
