import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Farm } from './farm.entity';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
export class Farm_Application {
  @PrimaryGeneratedColumn('increment')
  application_num: number;

  @ManyToOne(() => Farm)
  farm_num: Farm;

  @ManyToOne(() => User)
  user_id: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  appliedAt: Date;
}
