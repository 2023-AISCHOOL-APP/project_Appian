import { Controller, Get, Query } from '@nestjs/common';
import {
  ApplyFarmInput,
  CheckFarmInput,
} from '../farms/dto/farm-container.dto';
import { Farm_ApplicationsService } from './farm_application.service';

@Controller('farm_apply')
export class Farm_ApplicationsController {
  constructor(
    private readonly farm_ApplicationsService: Farm_ApplicationsService,
  ) {}

  // 텃밭 신청 체크 (해당 텃밭에 신청 내역 있는지)
  @Get('check')
  checkFarm(@Query() checkFarmInput: CheckFarmInput): Promise<string> {
    return this.farm_ApplicationsService.checkFarm({ checkFarmInput });
  }

  @Get('apply')
  applyFarm(@Query() applyFarmInput: ApplyFarmInput): Promise<string> {
    return this.farm_ApplicationsService.applyFarm({ applyFarmInput });
  }
}
