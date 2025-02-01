import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './supplier.entity';
import { UtilitiesModule } from '../_utilities/_utilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierEntity]), UtilitiesModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
