import { Module } from '@nestjs/common';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { KakaoApiService } from 'src/services/kakaoApi.service';
import { Farm_Application } from './entities/farm_application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Farm_Application])],
  controllers: [FarmsController],
  providers: [FarmsService, KakaoApiService],
})
export class FarmsModule {}
