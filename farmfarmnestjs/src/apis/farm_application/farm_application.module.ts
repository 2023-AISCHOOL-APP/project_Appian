import { Module } from '@nestjs/common';
import { Farm_ApplicationsController } from './farm_application.controller';
import { Farm_ApplicationsService } from './farm_application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm_Applications } from './entities/farm_application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm_Applications])],
  controllers: [Farm_ApplicationsController],
  providers: [Farm_ApplicationsService],
})
export class Farm_ApplicationsModule {}
