import { Body, Controller, Get, Param, Post, Put, Delete, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryEntity } from "./category.entity";
import { UpdateResult } from "typeorm";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(@Query() params: any): Promise<CategoryEntity[]> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return this.categoryService.findAllCategories(parsedPopulate, params);
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number, @Query() params: any): Promise<CategoryEntity> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return this.categoryService.findCategoryById(id, parsedPopulate, params);
  }

  @Post()
  async createCategory(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.categoryService.createCategory(category);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() category: CategoryEntity): Promise<UpdateResult> {
    return this.categoryService.updateCategory(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
