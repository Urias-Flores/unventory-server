import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';
import { UtilitiesModule } from '../_utilities/_utilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuoteEntity]), UtilitiesModule],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
