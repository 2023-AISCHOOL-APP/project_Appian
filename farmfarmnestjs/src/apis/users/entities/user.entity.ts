import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 20 })
  user_id: string;

  @Column({ length: 60 })
  user_pw: string;

  @Column({ unique: true, length: 50 })
  user_email: string;

  @Column({ unique: true, length: 10 })
  user_nick: string;

  @Column({ length: 10 })
  user_name: string;

  @Column({ length: 14 })
  user_phone: string;

  @Column()
  user_address: string;

  @Column({ type: 'tinyint', default: 0 })
  user_type: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
