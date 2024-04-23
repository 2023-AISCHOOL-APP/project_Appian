import { OmitType } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';
import { User } from 'src/apis/users/entities/users.entity';

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
  id?: string;
  user_type?: number;
}

export class LoginInput extends OmitType(Auth, ['user']) {}

export class MyInfoLoginInput {
  user_id: string;
  user_pw: string;
}
