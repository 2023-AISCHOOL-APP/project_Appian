import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from '../../contents/entities/content.entity';
import { User } from '../../users/entities/users.entity';

@Entity()
export class Content_Comment {
  @PrimaryGeneratedColumn('increment')
  content_comment_num: number;

  @ManyToOne(() => Content)
  content: Content;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'user_nick' })
  user: User;

  @Column({ length: 150 })
  content_comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
