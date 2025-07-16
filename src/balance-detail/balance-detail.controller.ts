import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BalanceDetailService } from './balance-detail.service';
import { BalanceDetailEntity } from './balance-detail.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('balance-details')
export class BalanceDetailController {
  constructor(private readonly balanceDetailService: BalanceDetailService) {}

  @Get()
  async findAllBalanceDetail(
    @Query() params: string | any,
  ): Promise<BalanceDetailEntity[]> {
    const parsedPopulate: [] = params.populate ? params.split(',') : [];
    delete params.populate;
    return await this.balanceDetailService.findAllBalanceDetail(
      parsedPopulate,
      params,
    );
  }

  @Get(':id')
  async findBalanceDetailById(
    @Param('id') id: number,
    @Query() params: string | any,
  ): Promise<BalanceDetailEntity> {
    const parsePopulate: [] = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.balanceDetailService.findBalanceById(
      id,
      parsePopulate,
      params,
    );
  }

  @Post()
  async createBalanceDetail(
    @Body() balanceDetail: BalanceDetailEntity,
  ): Promise<BalanceDetailEntity> {
    return await this.balanceDetailService.createBalanceDetail(balanceDetail);
  }

  @Put(':id')
  async updateBalanceDetail(
    @Param('id') id: number,
    @Body() balanceDetail: BalanceDetailEntity,
  ): Promise<UpdateResult> {
    return this.balanceDetailService.updateBalanceDetail(id, balanceDetail);
  }

  @Delete(':id')
  async deleteBalanceDetail(@Param('id') id: number): Promise<DeleteResult> {
    return this.balanceDetailService.deleteBalanceDetail(id);
  }
}
