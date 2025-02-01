import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleEntity } from './sale.entity';
import { UtilitiesService } from '../_utilities/_utilities.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('sales')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
    private readonly utilities: UtilitiesService,
  ) {}

  @Get()
  async getAllSales(@Query() variables: any): Promise<SaleEntity[]> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.saleService.findAllSales(populate, filters);
  }

  @Get(':id')
  async getSaleById(
    @Param('id') id: number,
    @Query() variables: any,
  ): Promise<SaleEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.saleService.findSaleById(id, populate, filters);
  }

  @Post()
  async createSale(@Body() sale: SaleEntity): Promise<SaleEntity> {
    return await this.saleService.createSale(sale);
  }

  @Put(':id')
  async updateSale(
    @Param('id') id: number,
    @Body() sale: SaleEntity,
  ): Promise<UpdateResult> {
    return await this.saleService.updateSale(id, sale);
  }

  @Delete(':id')
  async deleteSale(@Param('id') id: number): Promise<DeleteResult> {
    return await this.saleService.deleteSale(id);
  }
}
