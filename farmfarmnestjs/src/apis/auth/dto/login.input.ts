import { CreateUserInput } from 'src/apis/users/dto/createUser.input';

export type LoginInput = Pick<CreateUserInput, 'user_id' | 'user_pw'>;
