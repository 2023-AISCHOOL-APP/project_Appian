import { User } from '../entities/user.entity';

export type CreateUserInput = Omit<User, 'user_type' | 'createdAt'>;

export type LoginInput = Pick<User, 'user_id' | 'user_pw'>;

export type CheckUserInput = Partial<
  Pick<User, 'user_id' | 'user_email' | 'user_nick'>
>;

export class ChangeMyInfoInput {
  user_id: string;
}
