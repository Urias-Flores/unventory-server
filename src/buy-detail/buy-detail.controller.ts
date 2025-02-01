import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { BuyDetailService } from "./buy-detail.service";
import { BuyDetailEntity } from "./buy-detail.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { filter } from "rxjs";

@Controller('buy-details')
export class BuyDetailController {
  constructor(private readonly buyDetailService: BuyDetailService) {}

  @Get()
  async findAllBuyDetails(@Query() params: any): Promise<BuyDetailEntity[]> {
    const parsedPopulate: [] = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.buyDetailService.findAllBuyDetails(parsedPopulate, params);
  }

  @Get(':id')
  async findBuyDetailById(@Param('id') id: number, @Query() params: string | any): Promise<BuyDetailEntity>{
    const parsedPopulate: [] = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.buyDetailService.findBuyDetailById(id, parsedPopulate, params);
  }

  @Post()
  async createBuyDetail(@Body() buyDetail: BuyDetailEntity): Promise<BuyDetailEntity> {
    return await this.buyDetailService.createBuyDetail(buyDetail);
  }

  @Put(':id')
  async updateBuyDetail(@Param('id') id: number, @Body() buyDetail: BuyDetailEntity): Promise<UpdateResult> {
    return await this.buyDetailService.updateBuyDetail(id, buyDetail);
  }

  @Delete(':id')
  async deleteBuyDetail(@Param('id') id: number): Promise<DeleteResult> {
    return await this.buyDetailService.deleteBuyDetail(id);
  }
}
