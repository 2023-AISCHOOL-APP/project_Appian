import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('increment')
  farm_num: number;

  @Column({ length: 50 })
  farm_title: string;

  @Column({ length: 20 })
  farm_type: string;

  @Column({ length: 255 })
  farm_address: string;

  @Column()
  farm_price: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lat: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lng: number;

  @Column()
  lental_area: number;

  @Column()
  farm_sector: number;

  @Column({ length: 20 })
  lental_type: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  lental_startDate: Date;

  @Column()
  lental_endDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column()
  farm_img: string;

  @Column()
  createdat: Date;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
