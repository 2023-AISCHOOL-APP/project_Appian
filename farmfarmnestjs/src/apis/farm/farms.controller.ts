import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('farm')
export class FarmsController {
  constructor(
    private readonly farmService: FarmsService, //
  ) {}

  @Post('add_farm') // 농장 등록
  @UseInterceptors(FileInterceptor('farm_img'))
  createFarm(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
