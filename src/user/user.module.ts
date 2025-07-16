import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UtilitiesModule } from '../_utilities/_utilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UtilitiesModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
