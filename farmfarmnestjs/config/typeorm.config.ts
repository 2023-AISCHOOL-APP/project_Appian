import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/apis/users/entities/auth.entity';
import { Farm } from 'src/apis/farm/entities/farm.entity';
import { User } from 'src/apis/users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '8846',
  database: 'farmfarm',
  entities: [Auth, User, Farm], // 각각의 entity 연결
  synchronize: true, // 스키마 동기화
  logging: true, // 쿼리 실행 내역 로깅
};
