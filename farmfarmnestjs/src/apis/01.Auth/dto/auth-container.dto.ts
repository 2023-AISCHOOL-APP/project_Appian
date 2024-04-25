import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';
// import { IsNotEmpty } from 'class-validator';

class PickFromUser extends PickType(User, ['user_email', 'user_nick']) {
  @ApiProperty({ uniqueItems: true, maxLength: 20, example: 'TomatoKing' })
  user_id: string;
}
export class CheckUserInput extends PartialType(PickFromUser) {}

export class CreateUserInput extends OmitType(User, ['id', 'createdAt', 'user_type']) {
  @ApiProperty({ uniqueItems: true, maxLength: 20, example: 'TomatoKing' })
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: 'farmfarm1234' })
  @IsNotEmpty()
  user_pw: string;

  @ApiProperty({
    required: false,
    uniqueItems: true,
    description: '정보 수정할 때, uid',
    example: '49b3bd13-0a49-4f97-9b79-733bb0a709da',
  })
  id?: string;

  @ApiProperty({ required: false, description: '정보 수정할 때' })
  user_type?: number; // 정보 수정할 때
}

export class LoginInput {
  @ApiProperty({
    description: 'user_id || uid',
    example: 'TomatoKing || 49b3bd13-0a49-4f97-9b79-733bb0a709da',
  })
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: 'farmfarm1234' })
  @IsNotEmpty()
  user_pw: string;
}
