import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsModule } from './apis/farms/farms.module';
import { ConfigModule } from '@nestjs/config';
import { Farm_ApplicationsModule } from './apis/farm_application/farm_application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    FarmsModule,
    Farm_ApplicationsModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // 각각의 entity 일일이 입력 or 자동순회
      synchronize: true, // 스키마 동기화
      logging: false, // 쿼리 실행 내역 터미널에 띄움
    }),
  ],
})
export class AppModule {}
