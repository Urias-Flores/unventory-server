import { Body, Controller, Get, Param, Post, Put, Query, Delete } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductEntity } from "./product.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { UtilitiesService } from "../_utilities/_utilities.service";

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly utilities: UtilitiesService
  ) {}

  @Get()
  async findAll(@Query() variables: any): Promise<ProductEntity[]>{
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.productService.findAllProducts(populate, filters);
  }

  @Get(':id')
  async findProductById(@Param('id') id: number, @Query() variables: any): Promise<ProductEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.productService.findProductById(id, populate, filters);
  }

  @Post()
  async createProduct(@Body() product: ProductEntity): Promise<ProductEntity> {
    return await this.productService.createProduct(product);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() product: ProductEntity): Promise<UpdateResult> {
    return await this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<DeleteResult> {
    return await this.productService.deleteProduct(id);
  }
}
