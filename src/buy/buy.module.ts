import { Module } from '@nestjs/common';
import { BuyController } from './buy.controller';
import { BuyService } from './buy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyEntity } from './buy.entity';
import { BuyDetailEntity } from '../buy-detail/buy-detail.entity';
import { InventoryEntity } from '../inventory/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BuyEntity, BuyDetailEntity, InventoryEntity]),
  ],
  controllers: [BuyController],
  providers: [BuyService],
})
export class BuyModule {}
