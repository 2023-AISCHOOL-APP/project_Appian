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
import { CreateFarmInput, GetFarmInput } from './dto/farm-container.dto';

@Controller('farm')
export class FarmsController {
  constructor(
    private readonly farmService: FarmsService, //
  ) {}

  @Post('add_farm')
  createFarm(@Body() createFarmInput: CreateFarmInput) {
    return this.farmService.createFarm({ createFarmInput });
  }

  @Get('farm')
  getFarm(@Query() getFarmInput: GetFarmInput) {
    return this.farmService.getFarm({ getFarmInput });
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
