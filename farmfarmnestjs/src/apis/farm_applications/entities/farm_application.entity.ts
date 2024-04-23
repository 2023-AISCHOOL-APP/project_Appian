import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';
import { User } from 'src/apis/users/entities/users.entity';

@Entity()
export class Farm_Application {
  @PrimaryGeneratedColumn('increment')
  application_num: number;

  @ManyToOne(() => Farm)
  farm: Farm;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
