import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { BalanceService } from "./balance.service";
import { BalanceEntity } from "./balance.entity";

@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async findAllBalances(@Query() params: String | any): Promise<any> {
    const parsedPopulate: [] = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.balanceService.findAllBalances(parsedPopulate, params);
  }

  @Get(':id')
  async findBalanceById(@Param('id') id: number, @Query() params: String | any): Promise<any> {
    const parsedPopulate: [] = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.balanceService.findBalanceById(id, parsedPopulate, params);
  }

  @Post()
  async createBalance(@Body() balance: BalanceEntity): Promise<BalanceEntity>{
    return await this.balanceService.createBalance(balance);
  }

  @Put(':id')
  async updateBalance(@Param('id') id: number, @Body() balance: BalanceEntity): Promise<UpdateResult>{
    return await this.balanceService.updateBalance(id, balance);
  }

  @Delete(':id')
  async deleteBalance(@Param('id' ) id: number): Promise<DeleteResult> {
    return this.balanceService.deleteBalance(id);
  }
}
