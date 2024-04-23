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
  ApplyFarmInput,
  CancelApply,
  CheckFarmInput,
  CreateFarmInput,
  GetApplicantInput,
  GetFarmsInput,
  GetMyFarmApply,
} from './dto/farms-container.dto';
import { Farm } from './entities/farm.entity';

@Controller('farm')
export class FarmsController {
  constructor(
    private readonly farmService: FarmsService, //
  ) {}

  @Post('add_farm') // 텃밭 등록 (이미지 안받음) // 입력들 없는거 처리필요한들.
  createFarm(@Body() createFarmInput: CreateFarmInput): Promise<string> {
    return this.farmService.createFarm({ createFarmInput });
  }

  @Get('farm') // 텃밭 검색
  getFarms(@Query() getFarmsInput: GetFarmsInput): Promise<Farm[]> {
    return this.farmService.getFarms({ getFarmsInput });
  }

  @Get('farm_check') // 텃밭 신청 체크 (해당 텃밭에 신청 내역 있는지)
  checkFarm(@Query() checkFarmInput: CheckFarmInput): Promise<string> {
    return this.farmService.checkFarm({ checkFarmInput });
  }

  @Get('farm_apply') // 텃밭 분양 신청
  applyFarm(@Query() applyFarmInput: ApplyFarmInput): Promise<string> {
    return this.farmService.applyFarm({ applyFarmInput });
  }

  @Get('my_apply') // 텃밭 분양 신청 내역
  getMyFarmApply(@Query() getMyFarmApplyInput: GetMyFarmApply) {
    return this.farmService.getMyFarmApply({ getMyFarmApplyInput });
  }

  @Get('applicant') // 텃밭 분양 신청자 내역
  getApplicant(@Query() getApplicantInput: GetApplicantInput) {
    return this.farmService.getApplicant({ getApplicantInput });
  }

  @Get('cancel') // 텃밭 분양 신청 취소
  cancleApply(@Query() cancelApply: CancelApply) {
    return this.farmService.cancelApply({ cancelApply });
  }
}

// @Post('add_farm') // 이미지 파일 받을 때 농장 등록
// @UseInterceptors(FileInterceptor('farm_img'))
// createFarm(
//   @Body() createFarmInput: CreateFarmInput,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   return this.farmService.createFarmWithImgFile({ createFarmInput, file });
// }
