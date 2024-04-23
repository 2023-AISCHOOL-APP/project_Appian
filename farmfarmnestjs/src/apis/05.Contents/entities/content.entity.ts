import { User } from 'src/apis/02.Users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('increment')
  content_num: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'user_nick' })
  user: User;

  @Column({ length: 30 })
  content_title: string;

  @Column({ type: 'text' })
  contents: string;

  @Column()
  content_img: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
