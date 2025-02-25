import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilitiesModule } from '../_utilities/_utilities.module';
import { RequestEntity } from './request.entity';
import { InventoryEntity } from '../inventory/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, InventoryEntity]),
    UtilitiesModule,
  ],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
