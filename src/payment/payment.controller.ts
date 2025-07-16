import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentEntity } from './payment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('pays')
export class PaymentController {
  constructor(private readonly payService: PaymentService) {}

  @Get()
  async findAllPays(@Query() variables: any): Promise<PaymentEntity[]> {
    const populate = variables.populate ? variables.populate.split(',') : [];
    delete variables.populate;
    return await this.payService.findAllPays(populate, variables);
  }

  @Get(':id')
  async findPayById(
    @Param('id') id: number,
    @Query() variables: any,
  ): Promise<PaymentEntity> {
    const populate = variables.populate ? variables.populate.split(',') : [];
    delete variables.populate;
    return await this.payService.findPayById(id, populate, variables);
  }

  @Post()
  async createPay(@Body() pay: PaymentEntity): Promise<PaymentEntity> {
    return this.payService.createPay(pay);
  }

  @Put(':id')
  async updatePay(
    @Param('id') id: number,
    @Body() pay: PaymentEntity,
  ): Promise<UpdateResult> {
    return await this.payService.updatePay(id, pay);
  }

  @Delete(':id')
  async deletePay(@Param('id') id: number): Promise<DeleteResult> {
    return await this.payService.deletePay(id);
  }
}
