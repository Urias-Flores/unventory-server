import { Module } from '@nestjs/common';
import { RequestDetailController } from './request-detail.controller';
import { RequestDetailService } from './request-detail.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestDetailEntity } from "./request-detail.entity";
import { UtilitiesModule } from "../_utilities/_utilities.module";

@Module({
  imports: [TypeOrmModule.forFeature([RequestDetailEntity]), UtilitiesModule],
  controllers: [RequestDetailController],
  providers: [RequestDetailService]
})
export class RequestDetailModule {}
