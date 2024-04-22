import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IFarmServiceApplyFarm,
  IFarmServiceCheckFarm,
} from '../farms/interface/farm-service.interface';
import { Farm_Applications } from './entities/farm_application.entity';

@Injectable()
export class Farm_ApplicationsService {
  constructor(
    @InjectRepository(Farm_Applications)
    private readonly farm_ApplicationRepository: Repository<Farm_Applications>,
  ) {}

  checkFarmApply({ user_id, farm_num }) {
    return this.farm_ApplicationRepository.findOne({
      where: { user_id, farm_num },
    });
  }

  countFarmApply({ farm_num }) {
    return this.farm_ApplicationRepository.count({
      where: { farm_num },
    });
  }

  async checkFarm({ checkFarmInput }: IFarmServiceCheckFarm): Promise<string> {
    const { user_id, farm_num } = checkFarmInput;
    const apply = await this.checkFarmApply({
      user_id,
      farm_num,
    });
    if (apply) return '텃밭 신청 내역 있음';
    return '텃밭 신청 내역 없음';
  }

  async applyFarm({ applyFarmInput }: IFarmServiceApplyFarm): Promise<string> {
    const { farm_num, farm_sector } = applyFarmInput;
    const appliedNumber = await this.countFarmApply({
      farm_num,
    });
    if (farm_sector <= appliedNumber) return '분양 신청 자리가 다 찼습니다.';
    const apply = this.farm_ApplicationRepository.save({ ...applyFarmInput });
    if (!apply) throw new InternalServerErrorException('서버 오류');
    return '분양 신청 성공';
  }
}
