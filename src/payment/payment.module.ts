import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './payment.entity';
import { SaleEntity } from '../sale/sale.entity';
import { RequestEntity } from '../request/request.entity';
import { BuyEntity } from '../buy/buy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentEntity,
      SaleEntity,
      RequestEntity,
      BuyEntity,
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
