import { ChangeMyInfoInput } from '../dto/user-container.dto';

export interface IUserServiceRetrun {
  user_id: string;
  user_nick: string;
  user_type: number;
  message: string;
}

export interface IUserServiceChangeMyInfo {
  changeMyInfoInput: ChangeMyInfoInput;
}
