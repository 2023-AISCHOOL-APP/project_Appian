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
import { CreateFarmInput, GetFarmsInput } from './dto/farm-container.dto';

@Controller('farm')
export class FarmsController {
  constructor(
    private readonly farmService: FarmsService, //
  ) {}

  // 텃밭 등록 (이미지 안받음)
  @Post('add_farm')
  createFarm(@Body() createFarmInput: CreateFarmInput): Promise<string> {
    return this.farmService.createFarm({ createFarmInput });
  }

  // 텃밭 검색
  @Get('farm')
  getFarms(@Query() getFarmsInput: GetFarmsInput): Promise<any[]> {
    return this.farmService.getFarms({ getFarmsInput });
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
