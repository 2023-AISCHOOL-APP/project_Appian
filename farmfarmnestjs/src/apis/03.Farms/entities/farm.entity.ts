// import { Min } from 'class-validator';
import { User } from 'src/apis/02.Users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('increment')
  farm_num: number;

  @Column({ nullable: false, length: 50 })
  farm_title: string;

  @Column({ nullable: false })
  farm_address: string;

  @Column({ nullable: false, length: 20 })
  farm_type: string;

  // @Min(0)
  @Column({ nullable: false })
  farm_price: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lat: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lng: number;

  @Column({ nullable: false })
  lental_area: number;

  @Column({ nullable: false })
  farm_sector: number;

  @Column({ nullable: false, length: 20 })
  lental_type: string;

  @Column({ nullable: false, type: 'date' })
  startDate: Date;

  @Column({ nullable: false, type: 'date' })
  endDate: Date;

  @Column({ nullable: false, type: 'date' })
  lental_startDate: Date;

  @Column({ nullable: false, type: 'date' })
  lental_endDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column()
  farm_img: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;
}
