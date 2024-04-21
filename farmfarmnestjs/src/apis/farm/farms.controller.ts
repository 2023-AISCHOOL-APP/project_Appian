import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
// import { FileInterceptor } from '@nestjs/platform-express';
import {
  CheckFarmInput,
  CreateFarmInput,
  GetFarmInput,
} from './dto/farm-container.dto';

@Controller('farm')
export class FarmsController {
  constructor(
    private readonly farmService: FarmsService, //
  ) {}

  // 텃밭 등록 (이미지 안받음)
  @Post('add_farm')
  createFarm(@Body() createFarmInput: CreateFarmInput) {
    return this.farmService.createFarm({ createFarmInput });
  }

  // 텃밭 검색
  @Get('farm')
  getFarm(@Query() getFarmInput: GetFarmInput) {
    return this.farmService.getFarm({ getFarmInput });
  }

  // 텃밭 신청 체크 (해당 텃밭에 신청 내역 있는지)
  @Get('farm_check')
  checkFarm(@Query() checkFarmInput: CheckFarmInput): Promise<string> {
    return this.farmService.checkFarm({ checkFarmInput });
  }

  @Get('farm_apply')
  applyFarm(@Query() applyFarmInput: CheckFarmInput) {
    return this.farmService.applyFarm({ applyFarmInput });
  }

  // @Post('add_farm') // 이미지 파일 받을 때 농장 등록
  // @UseInterceptors(FileInterceptor('farm_img'))
  // createFarm(
  //   @Body() createFarmInput: CreateFarmInput,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.farmService.createFarmWithImgFile({ createFarmInput, file });
  // }
}
