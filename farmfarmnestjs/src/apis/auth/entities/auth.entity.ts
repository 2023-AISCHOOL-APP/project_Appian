import { User } from 'src/apis/users/entities/users.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryColumn({ length: 20 })
  user_id: string;

  @Column({ length: 60 })
  user_pw: string;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
