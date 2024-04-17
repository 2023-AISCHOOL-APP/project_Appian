import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  user_pw: string;

  @Column()
  user_nick: string;

  @Column()
  user_name: string;
  @Column()
  user_email: string;

  @Column()
  user_phone: string;

  @Column()
  user_address: string;

  @Column()
  user_type: number;
}
