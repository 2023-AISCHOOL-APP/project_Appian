import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoApiService } from 'src/services/kakaoApi.service';
import { Farm } from './entities/farm.entity';
import { Repository } from 'typeorm';
import { GetFarmsInput } from './dto/farm-container.dto';
import { Farm_Application } from './entities/farm_application.entity';
import {
  IFarmServiceCheckFarm,
  IFarmServiceApplyFarm,
  IFarmServiceCreateFarm,
  IFarmServiceGetFarms,
} from './interface/farm-service.interface';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Farm_Application)
    private readonly farm_ApplicationRepository: Repository<Farm_Application>,
    private readonly kakaoApiService: KakaoApiService,
  ) {}

  findFarmsWithLike(input: GetFarmsInput): Promise<any[]> {
    const farms = this.farmRepository
      .createQueryBuilder('farm')
      .innerJoinAndSelect('farm.user_id', 'user')
      .select([
        'farm_num',
        'farm_title',
        'farm_address',
        'farm_type',
        'farm_price',
        'lat',
        'lng',
        'lental_area',
        'farm_sector',
        'lental_type',
        'DATE_FORMAT(farm.startDate, "%Y-%m-%d") as startDate',
        'DATE_FORMAT(farm.endDate, "%Y-%m-%d") as endDate',
        'DATE_FORMAT(farm.lental_startDate, "%Y-%m-%d") as lental_startDate',
        'DATE_FORMAT(farm.lental_endDate, "%Y-%m-%d") as lental_endDate',
        'DATE_FORMAT(farm.createdAt, "%Y-%m-%d") as farm_day',
        'description',
        'farm_img',
        'user_id',
        'user_nick',
        'user_phone',
        'user_email',
      ])
      .where('farm.farm_address LIKE :address', {
        address: `%${input.sido}%${input.sigungu}%`,
      })
      .getRawMany();
    return farms;
  }

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

  async createFarm({
    createFarmInput,
  }: IFarmServiceCreateFarm): Promise<string> {
    const { farm_address } = createFarmInput;
    const coordinates = await this.kakaoApiService.getLatLng(farm_address);
    const farm_img = String(Math.floor(Math.random() * 40) + 1);
    const farm = await this.farmRepository.save({
      ...createFarmInput,
      ...coordinates,
      farm_img,
    });
    if (farm) return '텃밭 등록 성공';
  }

  getFarms({ getFarmsInput }: IFarmServiceGetFarms): Promise<any[]> {
    const farmData = { ...getFarmsInput };
    const farms = this.findFarmsWithLike(farmData);
    return farms;
  }

  async checkFarm({ checkFarmInput }: IFarmServiceCheckFarm): Promise<string> {
    const { user_id, farm_num } = checkFarmInput;
    const apply = await this.checkFarmApply({ user_id, farm_num });
    if (apply) return '텃밭 신청 내역 있음';
    return '텃밭 신청 내역 없음';
  }

  async applyFarm({ applyFarmInput }: IFarmServiceApplyFarm): Promise<string> {
    const { farm_num, farm_sector } = applyFarmInput;
    const appliedNumber = await this.countFarmApply({ farm_num });
    if (farm_sector <= appliedNumber) return '분양 신청 자리가 다 찼습니다.';
    const apply = this.farm_ApplicationRepository.save({ ...applyFarmInput });
    if (!apply) throw new InternalServerErrorException('서버 오류');
    return '분양 신청 성공';
  }

  // 이미지 파일 받을 때
  // changeImgName(user_id: string, file: Express.Multer.File) {
  //   const newName = `${user_id}_${Date.now()}_${file.originalname}`;
  //   return newName;
  // }

  // async createFarmWithImgFile({ createFarmInput, file }) {
  //   const { user_id, farm_address } = createFarmInput;
  //   const { lat, lng } = await this.kakaoApiService.getLatLng(farm_address);
  //   const changedImgName = this.changeImgName(user_id, file);
  //   const farmData = { ...createFarmInput, lat, lng, farm_img: changedImgName };
  //   console.log(farmData);

  //   const farm = this.farmRepository.save(farmData);
  //   if (farm) return '텃밭 등록 성공';
  // }
}
