import { Module } from '@nestjs/common';
import { BuyDetailService } from './buy-detail.service';
import { BuyDetailController } from './buy-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyDetailEntity } from './buy-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BuyDetailEntity])],
  providers: [BuyDetailService],
  controllers: [BuyDetailController],
})
export class BuyDetailModule {}
