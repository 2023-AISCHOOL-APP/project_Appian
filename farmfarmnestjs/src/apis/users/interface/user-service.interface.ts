import { ReadMyInfoInput, UpdateMyInfoInput } from '../dto/user-container.dto';

export interface IUserServiceRetrun {
  user_id: string;
  user_nick: string;
  user_type: number;
  message: string;
}

export interface IUserServiceReadMyInfo {
  readMyInfoInput: ReadMyInfoInput;
}

export interface IUserServiceUpdateMyInfo {
  updateMyInfoInput: UpdateMyInfoInput;
}
