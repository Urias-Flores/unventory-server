import { Module } from '@nestjs/common';
import { InventoryActionController } from './inventory-action.controller';
import { InventoryActionService } from './inventory-action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryActionEntity } from './inventory-action.entity';
import { InventoryEntity } from '../inventory/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryActionEntity, InventoryEntity])],
  controllers: [InventoryActionController],
  providers: [InventoryActionService],
})
export class InventoryActionModule {}
