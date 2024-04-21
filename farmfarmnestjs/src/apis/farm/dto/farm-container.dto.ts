import { Farm } from '../entities/farm.entity';

export type CreateFarmInput = Omit<
  Farm,
  'farm_num' | 'lat' | 'lng' | 'farm_img' | 'createdAt'
>;

export interface GetFarmInput {
  sido: string;
  sigungu: string;
}
