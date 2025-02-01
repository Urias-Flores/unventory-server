import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { UtilitiesModule } from '../_utilities/_utilities.module';
import { InventoryEntity } from '../inventory/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, InventoryEntity]),
    UtilitiesModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
