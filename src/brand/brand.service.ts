import { HttpException, Injectable } from '@nestjs/common';
import { BrandEntity } from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async findAllBrands(populate: [], filters: {}): Promise<BrandEntity[]> {
    try {
      return await this.brandRepository.find({
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

  async findBrandById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<BrandEntity> {
    const filtersWithId = { ...filters, brandId: id };
    try {
      const brand = await this.brandRepository.find({
        relations: populate,
        where: filtersWithId,
      });
      return brand ? brand[0] : new BrandEntity();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createBrand(brand: BrandEntity): Promise<BrandEntity> {
    try {
      return await this.brandRepository.save(brand);
    } catch (error) {
      if (error.message.includes('Duplicate entry')) {
        if (error.message.includes('brand.IDX_5f468ae5696f07da025138e38f')) {
          throw new HttpException(
            'El nombre de marca ingresado ya existe',
            400,
          );
        }
      }
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateBrand(id: number, brand: BrandEntity): Promise<UpdateResult> {
    try {
      return await this.brandRepository.update({ brandId: id }, brand);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteBrand(id: number): Promise<DeleteResult> {
    try {
      return await this.brandRepository.delete({ brandId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
