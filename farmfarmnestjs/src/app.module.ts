import { Module } from '@nestjs/common';
import { UsersModule } from './apis/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeorm.config';
import { FarmsModule } from './apis/farm/farms.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    AuthModule, //
    UsersModule,
    FarmsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
