import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './apis/users/entities/user.entity';

@Module({
  imports: [
    UsersModule, //
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '8846',
      database: 'farmfarm',
      entities: [User],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
