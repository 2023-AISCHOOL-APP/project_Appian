import { OmitType } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';
import { User } from 'src/apis/02.Users/entities/users.entity';

export class CheckUserInput {
  user_id?: string;
  user_email?: string;
  user_nick?: string;
}

export class CreateUserInput extends OmitType(User, [
  'id',
  'createdAt',
  'user_type',
]) {
  user_id: string;
  user_pw: string;
  id?: string; // 정보 수정할 때
  user_type?: number; // 정보 수정할 때
}

export class LoginInput extends OmitType(Auth, ['user']) {}

export class MyInfoLoginInput {
  user_id: string; // uid
  user_pw: string;
}
