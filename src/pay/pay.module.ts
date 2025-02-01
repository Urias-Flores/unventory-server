import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayEntity } from './pay.entity';
import { SaleEntity } from '../sale/sale.entity';
import { RequestEntity } from '../request/request.entity';
import { BuyEntity } from '../buy/buy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PayEntity, SaleEntity, RequestEntity, BuyEntity]),
  ],
  controllers: [PayController],
  providers: [PayService],
})
export class PayModule {}
