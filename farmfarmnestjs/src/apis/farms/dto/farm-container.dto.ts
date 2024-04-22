import { User } from 'src/apis/users/entities/user.entity';
import { Farm } from '../entities/farm.entity';

export type CreateFarmInput = Omit<
  Farm,
  'farm_num' | 'lat' | 'lng' | 'farm_img' | 'createdAt'
>;

export class GetFarmsInput {
  sido: string;
  sigungu: string;
}

export class CheckFarmInput {
  farm_num: number;
  user_id: string;
}

export class ApplyFarmInput {
  farm_num: Farm;
  user_id: User;
  farm_sector: number;
}
