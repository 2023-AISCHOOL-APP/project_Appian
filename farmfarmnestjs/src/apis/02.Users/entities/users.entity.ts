import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'uid',
    maxLength: 36,
    example: '49b3bd13-0a49-4f97-9b79-733bb0a709da',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @ApiProperty({ uniqueItems: true, maxLength: 50, example: 'Mintchoco@gmail.com' })
  @Column({ unique: true, length: 50 })
  @IsNotEmpty()
  user_email: string;

  @ApiProperty({ uniqueItems: true, maxLength: 20, example: '민트초코' })
  @Column({ unique: true, length: 20 })
  @IsNotEmpty()
  user_nick: string;

  @ApiProperty({ maxLength: 10, example: '정건식' })
  @Column({ length: 10 })
  @IsNotEmpty()
  user_name: string;

  @ApiProperty({ maxLength: 14, example: '010-1234-5678' })
  @Column({ length: 14 })
  @IsNotEmpty()
  user_phone: string;

  @ApiProperty({
    required: false,
    example: '전라남도 순천시 해룡면 신대리 중흥X단지 XXX동 XXX호',
  })
  @Column()
  user_address: string;

  @ApiProperty({ default: 0 })
  @Column({ type: 'tinyint', default: 0 })
  user_type: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
