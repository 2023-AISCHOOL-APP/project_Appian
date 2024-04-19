import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ length: 10 })
  user_name: string;

  @Column({ unique: true, length: 10 })
  user_nick: string;

  @Column({ unique: true, length: 50 })
  user_email: string;

  @Column({ length: 14 }) // 나중에 입력 어떻게 되어있나 보자
  user_phone: string;

  @Column()
  user_address: string;

  @Column({ type: 'tinyint', default: 0 })
  user_type: number;

  @Column({ default: 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
