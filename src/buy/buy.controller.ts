import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { BuyService } from './buy.service';
import { BuyEntity } from './buy.entity';

@Controller('buys')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Get()
  async findAllBuys(@Query() params: string | any): Promise<BuyEntity[]> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.buyService.findAllBuys(parsedPopulate, params);
  }

  @Get(':id')
  async findBuyById(
    @Param('id') id: number,
    @Query() params: string | any,
  ): Promise<BuyEntity> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.buyService.findBuyById(id, parsedPopulate, params);
  }

  @Post()
  async createBuy(@Body() buy: BuyEntity): Promise<BuyEntity> {
    buy.date = new Date();
    buy.time = new Date();
    return await this.buyService.createBuy(buy);
  }

  @Put(':id')
  async updateBuy(
    @Param('id') id: number,
    @Body() buy: BuyEntity,
  ): Promise<UpdateResult> {
    return await this.buyService.updateBuy(id, buy);
  }

  @Delete(':id')
  async deleteBuy(@Param('id') id: number): Promise<DeleteResult> {
    return await this.buyService.deleteBuy(id);
  }
}
