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
import { UtilitiesService } from '../_utilities/_utilities.service';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailEntity } from './sale-detail.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('sale-details')
export class SaleDetailController {
  constructor(
    private readonly saleDetailService: SaleDetailService,
    private readonly utilities: UtilitiesService,
  ) {}

  @Get()
  async findAllSaleDetails(
    @Query() variables: any,
  ): Promise<SaleDetailEntity[]> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.saleDetailService.findAllSaleDetails(populate, filters);
  }

  @Get(':id')
  async findSaleById(
    @Param('id') id: number,
    @Query() variables: any,
  ): Promise<SaleDetailEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.saleDetailService.findSaleDetailById(
      id,
      populate,
      filters,
    );
  }

  @Post()
  async createSaleDetail(
    @Body() saleDetail: SaleDetailEntity,
  ): Promise<SaleDetailEntity> {
    return await this.saleDetailService.createSaleDetail(saleDetail);
  }

  @Put(':id')
  async updateSaleDetail(
    @Param('id') id: number,
    @Body() saleDetail: SaleDetailEntity,
  ): Promise<UpdateResult> {
    return await this.saleDetailService.updateSaleDetail(id, saleDetail);
  }

  @Delete(':id')
  async deleteSaleDetail(@Param('id') id: number): Promise<DeleteResult> {
    return await this.saleDetailService.deleteSaleDetail(id);
  }
}
