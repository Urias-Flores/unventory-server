import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { InventoryEntity } from '../inventory/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    private readonly datasource: DataSource,
  ) {}

  async findAllProducts(populate: [], filters: {}): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.find({
        relations: populate,
        where: filters,
        order: {
          description: 'ASC',
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

  async findProductById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<ProductEntity> {
    const filtersWithId = { ...filters, productId: id };
    try {
      return await this.productRepository.findOne({
        relations: populate,
        where: filtersWithId,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const productInventory = product.inventory;
      delete product.inventory;

      //Add a new inventory entity
      const inventoryInserted: InventoryEntity = await queryRunner.manager.save(
        InventoryEntity,
        productInventory,
      );

      if (
        !inventoryInserted.inventoryId ||
        inventoryInserted.inventoryId === 0
      ) {
        throw new HttpException(
          "the product can't be inserted: Bad inventory part",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      //Add our product entity
      product.inventory = inventoryInserted;
      const productInserted: ProductEntity = await queryRunner.manager.save(
        ProductEntity,
        product,
      );

      if (!productInserted.productId || productInserted.productId === 0) {
        throw new HttpException(
          "the product can't be inserted: Bad entity",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await queryRunner.commitTransaction();
      return productInserted;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async updateProduct(
    id: number,
    product: ProductEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.productRepository.update({ productId: id }, product);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteProduct(id: number): Promise<DeleteResult> {
    try {
      return await this.productRepository.delete(id);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
