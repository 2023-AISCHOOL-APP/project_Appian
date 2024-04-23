import {
  CheckUserInput,
  CreateUserInput,
} from 'src/apis/auth/dto/auth-container.dto';
export interface IUsersServiceFindOneByInputInUser {
  inputs: Omit<CheckUserInput, 'user_id'>;
}

export interface IUsersServiceCreateUser {
  userData: Omit<CreateUserInput, 'user_id' | 'user_pw'>;
}
