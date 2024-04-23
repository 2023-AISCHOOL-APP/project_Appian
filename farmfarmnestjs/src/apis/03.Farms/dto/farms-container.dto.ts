import { Farm } from '../entities/farm.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateFarmInput extends OmitType(Farm, [
  'farm_num',
  'lat',
  'lng',
  'farm_img',
  'createdAt',
  'user',
]) {
  user_id: string; // uid
}

export class GetFarmsInput {
  sido: string;
  sigungu: string;
}

export class CheckFarmInput {
  farm_num: number;
  user_id: string; // uid
}

export class ApplyFarmInput {
  farm_num: number;
  user_id: string; // uid
  farm_sector: number;
}

export class GetMyFarmApply {
  user_id: string; // uid
}

export class GetApplicantInput {
  user_id: string; // uid
}

export class CancelApply {
  application_num: number;
}
