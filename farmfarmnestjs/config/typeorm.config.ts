import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/apis/**/*.entity.*'], // 각각의 entity 일일이 입력 or 자동순회
  synchronize: true, // 스키마 동기화
  logging: false, // 쿼리 실행 내역 터미널에 띄움
};
