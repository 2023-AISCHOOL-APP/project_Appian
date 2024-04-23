import {
  CheckUserInput,
  CreateUserInput,
  LoginInput,
  MyInfoLoginInput,
} from '../dto/auth-container.dto';

export interface IAuthServiceCheckInput {
  checkUserInput: CheckUserInput;
}

export interface IAuthServiceLogin {
  loginInput: LoginInput;
}

export interface IAuthServiceCreate {
  createUserInput: CreateUserInput;
}

export interface IAuthServiceMyInfoLogin {
  myInfoLogin: MyInfoLoginInput;
}
