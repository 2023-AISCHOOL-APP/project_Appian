import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farm } from '../../03.Farms/entities/farm.entity';
import { User } from 'src/apis/02.Users/entities/users.entity';

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
