import { Module } from '@nestjs/common';
import { BalanceDetailController } from './balance-detail.controller';
import { BalanceDetailService } from './balance-detail.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BalanceDetailEntity } from "./balance-detail.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BalanceDetailEntity])],
  controllers: [BalanceDetailController],
  providers: [BalanceDetailService]
})
export class BalanceDetailModule {}
