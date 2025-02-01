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
import { SupplierService } from './supplier.service';
import { UtilitiesService } from '../_utilities/_utilities.service';
import { SupplierEntity } from './supplier.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('suppliers')
export class SupplierController {
  constructor(
    private readonly supplierService: SupplierService,
    private readonly utilities: UtilitiesService,
  ) {}

  @Get()
  async findAllSuppliers(@Query() variables: any): Promise<SupplierEntity[]> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.supplierService.findAllSuppliers(populate, filters);
  }

  @Get(':id')
  async findSupplierById(
    @Param('id') id: number,
    @Query() variables: any,
  ): Promise<SupplierEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.supplierService.findAllSupplierById(
      id,
      populate,
      filters,
    );
  }

  @Post()
  async createSupplier(
    @Body() supplier: SupplierEntity,
  ): Promise<SupplierEntity> {
    return await this.supplierService.createSupplier(supplier);
  }

  @Put(':id')
  async updateSupplier(
    @Param('id') id: number,
    @Body() supplier: SupplierEntity,
  ): Promise<UpdateResult> {
    return await this.supplierService.updateSupplier(id, supplier);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id') id: number): Promise<DeleteResult> {
    return await this.supplierService.deleteSupplier(id);
  }
}
