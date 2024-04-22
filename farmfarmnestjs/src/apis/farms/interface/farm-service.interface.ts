import {
  ApplyFarmInput,
  CheckFarmInput,
  CreateFarmInput,
  GetFarmsInput,
} from '../dto/farm-container.dto';

export interface IFarmServiceCreateFarm {
  createFarmInput: CreateFarmInput;
}

export interface IFarmServiceGetFarms {
  getFarmsInput: GetFarmsInput;
}

export interface IFarmServiceCheckFarm {
  checkFarmInput: CheckFarmInput;
}

export interface IFarmServiceApplyFarm {
  applyFarmInput: ApplyFarmInput;
}
