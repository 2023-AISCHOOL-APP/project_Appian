import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  user_email: string;

  @Column({ unique: true, length: 20 })
  user_nick: string;

  @Column({ nullable: false, length: 10 })
  user_name: string;

  @Column({ length: 14 })
  user_phone: string;

  @Column()
  user_address: string;

  @Column({ type: 'tinyint', default: 0 })
  user_type: number;

  @CreateDateColumn()
  createdAt: Date;
}
