import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { BrandEntity } from './brand.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Brand')
@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAllBrand(
    @Query() params: Record<string, string>,
  ): Promise<BrandEntity[]> {
    const parsedPopulate: string[] = params.populate
      ? params.populate.split(',')
      : [];
    delete params.populate;
    return await this.brandService.findAllBrands(parsedPopulate, params);
  }

  @Get(':id')
  async findBrandById(
    @Param('id') id: number,
    @Query() params: Record<string, string>,
  ): Promise<BrandEntity> {
    const parsedPopulate: string[] = params.populate
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
