import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(
    populate: [],
    filters: {},
  ): Promise<CategoryEntity[]> {
    try {
      return await this.categoryRepository.find({
        relations: populate,
        where: filters,
        order: {
          name: 'ASC',
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async findCategoryById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<CategoryEntity> {
    const filtersWithId = { ...filters, categoryId: id };
    try {
      const categories = await this.categoryRepository.find({
        relations: populate,
        where: filtersWithId,
      });
      return categories ? categories[0] : new CategoryEntity();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    try {
      return this.categoryRepository.save(category);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateCategory(
    id: number,
    category: CategoryEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.categoryRepository.update({ categoryId: id }, category);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteCategory(id: number): Promise<DeleteResult> {
    try {
      return this.categoryRepository.delete({ categoryId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
