import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandEntity } from './brand.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAllBrand(@Query() params: string | any): Promise<BrandEntity[]> {
    const parsedPopulate: [] = params.populate
      ? params.populate.split(',')
      : [];
    delete params.populate;
    return await this.brandService.findAllBrands(parsedPopulate, params);
  }

  @Get(':id')
  async findBrandById(
    @Param('id') id: number,
    @Query() params: string | any,
  ): Promise<BrandEntity> {
    const parsedPopulate: [] = params.populate
      ? params.populate.split(',')
      : [];
    delete params.populate;
    return await this.brandService.findBrandById(id, parsedPopulate, params);
  }

  @Post()
  async createBrand(@Body() brand: BrandEntity): Promise<BrandEntity> {
    return await this.brandService.createBrand(brand);
  }

  @Put(':id')
  async updateBrand(
    @Param('id') id: number,
    @Body() brand: BrandEntity,
  ): Promise<UpdateResult> {
    return await this.brandService.updateBrand(id, brand);
  }

  @Delete(':id')
  async deleteBrand(@Param('id') id: number): Promise<DeleteResult> {
    return this.brandService.deleteBrand(id);
  }
}
