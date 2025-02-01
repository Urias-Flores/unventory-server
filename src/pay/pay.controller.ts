import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { PayService } from "./pay.service";
import { PayEntity } from "./pay.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('pays')
export class PayController {
  constructor(private readonly payService: PayService) {}

  @Get()
  async findAllPays(@Query() variables: any): Promise<PayEntity[]> {
    const populate = variables.populate ? variables.populate.split(',') : [];
    delete variables.populate;
    return await this.payService.findAllPays(populate, variables);
  }

  @Get(':id')
  async findPayById(@Param('id') id: number, @Query() variables: any): Promise<PayEntity> {
    const populate = variables.populate ? variables.populate.split(',') : [];
    delete variables.populate;
    return await this.payService.findPayById(id, populate, variables);
  }

  @Post()
  async createPay(@Body() pay: PayEntity): Promise<PayEntity> {
    return this.payService.createPay(pay);
  }

  @Put(':id')
  async updatePay(@Param('id') id: number, @Body() pay: PayEntity): Promise<UpdateResult> {
    return await this.payService.updatePay(id, pay);
  }

  @Delete(':id')
  async deletePay(@Param('id') id: number): Promise<DeleteResult> {
    return await this.payService.deletePay(id);
  }
}
