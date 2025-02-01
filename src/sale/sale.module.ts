import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { UtilitiesModule } from '../_utilities/_utilities.module';
import { InventoryEntity } from '../inventory/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleEntity, InventoryEntity]),
    UtilitiesModule,
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
