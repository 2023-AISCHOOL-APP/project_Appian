import { Injectable } from '@nestjs/common';

@Injectable()
export class FarmsService {
  create() {
    return '농장 등록에 성공했습니다.';
  }
}
