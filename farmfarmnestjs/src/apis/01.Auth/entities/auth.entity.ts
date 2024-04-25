import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @ApiProperty({ maxLength: 20, example: 'TomatoKing' })
  @PrimaryColumn({ length: 20 })
  @IsNotEmpty()
  user_id: string;

  @Column({ length: 60 })
  @IsNotEmpty()
  user_pw: string;

  @ApiProperty({ description: 'User 테이블 id와 결합' })
  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
