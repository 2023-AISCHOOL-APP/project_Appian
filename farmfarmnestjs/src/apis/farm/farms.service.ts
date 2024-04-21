import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoApiService } from 'src/services/kakaoApi.service';
import { Farm } from './entities/farm.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    private readonly kakaoApiService: KakaoApiService,
  ) {}

  async findFarmsWithLike(input) {
    const farms = await this.farmRepository.find({
      where: { farm_address: Like(`%${input.sido}%${input.sigungu}%`) },
    });
    return farms;
  }

  async createFarm({ createFarmInput }) {
    const { farm_address } = createFarmInput;
    const { lat, lng } = await this.kakaoApiService.getLatLng(farm_address);
    const farm_img = Math.floor(Math.random() * 40) + 1;
    const farmData = { ...createFarmInput, lat, lng, farm_img };
    console.log(farm_img);

    console.log(farmData);

    const farm = await this.farmRepository.save(farmData);
    if (farm) return '텃밭 등록 성공';
  }

  async getFarm({ getFarmInput }) {
    const farms = await this.findFarmsWithLike(getFarmInput);
    return farms;
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
