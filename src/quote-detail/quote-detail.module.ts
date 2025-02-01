import { Module } from '@nestjs/common';
import { QuoteDetailController } from './quote-detail.controller';
import { QuoteDetailService } from './quote-detail.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuoteDetailEntity } from "./quote-detail.entity";
import { UtilitiesModule } from "../_utilities/_utilities.module";

@Module({
  imports: [TypeOrmModule.forFeature([QuoteDetailEntity]), UtilitiesModule],
  controllers: [QuoteDetailController],
  providers: [QuoteDetailService]
})
export class QuoteDetailModule {}
