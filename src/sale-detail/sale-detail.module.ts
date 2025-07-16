import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailController } from './sale-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetailEntity } from './sale-detail.entity';
import { UtilitiesModule } from '../_utilities/_utilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetailEntity]), UtilitiesModule],
  providers: [SaleDetailService],
  controllers: [SaleDetailController],
})
export class SaleDetailModule {}
