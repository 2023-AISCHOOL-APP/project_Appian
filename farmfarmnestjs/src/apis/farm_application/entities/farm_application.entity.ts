import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
export class Farm_Applications {
  @PrimaryGeneratedColumn('increment')
  application_num: number;

  @ManyToOne(() => Farm)
  farm_num: Farm;

  @ManyToOne(() => User)
  user_id: User;

  @CreateDateColumn()
  createdAt: Date;
}
