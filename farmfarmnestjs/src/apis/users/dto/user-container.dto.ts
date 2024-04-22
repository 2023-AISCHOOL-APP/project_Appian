import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserInput extends OmitType(User, [
  'user_type',
  'createdAt',
]) {}

export type LoginInput = Pick<User, 'user_id' | 'user_pw'>;

export type CheckUserInput = Partial<
  Pick<User, 'user_id' | 'user_email' | 'user_nick'>
>;

export class ReadMyInfoInput {
  user_id: string;
}

export class UpdateMyInfoInput extends PartialType(CreateUserInput) {}
