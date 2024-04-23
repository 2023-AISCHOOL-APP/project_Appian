import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Farm_Application } from './entities/farm_application.entity';
import {
  IFarmServiceApplyFarm,
  IFarmServiceCheckFarm,
  IFarmServiceGetMyFarmApplyInput,
} from '../farms/interfaces/farms-service.interface';

@Injectable()
export class Farm_ApplicationsService {
  constructor(
    @InjectRepository(Farm_Application)
    private readonly farm_ApplicationRepository: Repository<Farm_Application>,
  ) {}

  checkFarmApply({
    checkFarmInput,
  }: IFarmServiceCheckFarm): Promise<Farm_Application> {
    return this.farm_ApplicationRepository.findOne({
      where: {
        farm: { farm_num: checkFarmInput.farm_num },
        user: { id: checkFarmInput.id },
      }, // and 연산
    });
  }

  countFarmApply({ farm_num }: { farm_num: number }): Promise<number> {
    return this.farm_ApplicationRepository.count({
      where: { farm: { farm_num: farm_num } },
    });
  }

  applyFarm({
    applyFarmInput,
  }: IFarmServiceApplyFarm): Promise<Farm_Application> {
    return this.farm_ApplicationRepository.save({
      farm: { farm_num: applyFarmInput.farm_num },
      user: { id: applyFarmInput.id },
    });
  }

  findApplyFarmByUserId({
    getMyFarmApplyInput,
  }: IFarmServiceGetMyFarmApplyInput) {
    return this.farm_ApplicationRepository.find({
      where: { user: { id: getMyFarmApplyInput.user_id } },
      relations: ['farm'],
      order: {
        application_num: 'DESC',
      },
    });
  }

  findApplicantByFarmNum({ farmNums }) {
    return this.farm_ApplicationRepository.find({
      where: { farm: { farm_num: In(farmNums) } },
      relations: ['farm', 'user'],
      order: {
        application_num: 'DESC',
      },
    });
  }

  cancelApply({ cancelApply }) {
    return this.farm_ApplicationRepository.softDelete({ ...cancelApply });
  }
}
