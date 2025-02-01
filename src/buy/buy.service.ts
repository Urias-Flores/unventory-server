import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyEntity } from './buy.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BuyDetailEntity } from '../buy-detail/buy-detail.entity';
import { InventoryEntity } from '../inventory/inventory.entity';
import { ProductEntity } from '../product/product.entity';

@Injectable()
export class BuyService {
  constructor(
    @InjectRepository(BuyEntity)
    private readonly buyRepository: Repository<BuyEntity>,
    @InjectRepository(BuyDetailEntity)
    private readonly buyDetailRepository: Repository<BuyDetailEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findAllBuys(populate: [], filters: object): Promise<BuyEntity[]> {
    try {
      return await this.buyRepository.find({
        relations: populate,
        where: filters,
        order: { date: 'DESC', time: 'DESC' },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async findBuyById(
    id: number,
    populate: [],
    filters: object,
  ): Promise<BuyEntity> {
    const filtersWithId = { ...filters, buyId: id };
    try {
      const buy = await this.buyRepository.find({
        relations: populate,
        where: filtersWithId,
      });
      return buy ? buy[0] : null;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createBuy(buy: BuyEntity): Promise<BuyEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const buyDetails = buy.buyDetails;
    delete buy.buyDetails;
    try {
      const savedBuy = await queryRunner.manager.save(BuyEntity, buy);

      for (const buyDetail of buyDetails) {
        buyDetail.buy = savedBuy;
        const savedDetail = await queryRunner.manager.save(
          BuyDetailEntity,
          buyDetail,
        );

        const inventory = await this.inventoryRepository.findOne({
          //In this case savedDetail.product only has the productId therefore we need to past it to number before to load the product entity
          where: { product: new ProductEntity(Number(savedDetail.product)) },
        });

        if (!inventory) {
          throw new HttpException(
            `Product ${savedDetail.product} can not be found`,
            HttpStatus.NOT_FOUND,
          );
        }

        inventory.amount += savedDetail.amount;
        await queryRunner.manager.save(InventoryEntity, inventory);
      }
      await queryRunner.commitTransaction();

      return savedBuy;
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

  async updateBuy(id: number, buy: BuyEntity): Promise<UpdateResult> {
    try {
      return await this.buyRepository.update({ buyId: id }, buy);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteBuy(id: number): Promise<DeleteResult> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const buyDetails = await this.buyDetailRepository.find({
        relations: ['product'],
        where: {
          buy: new BuyEntity(id),
        },
      });

      for (const buyDetail of buyDetails) {
        console.log(buyDetail);
        const inventory = await this.inventoryRepository.findOne({
          where: {
            product: buyDetail.product,
          },
        });
        if (!inventory) {
          throw new HttpException(
            `Product ${buyDetail.product} can not be found`,
            HttpStatus.NOT_FOUND,
          );
        }

        inventory.amount = inventory.amount - buyDetail.amount;
        console.log(
          `new inventory amount ${inventory.amount} for product ${buyDetail.product}`,
        );
        await queryRunner.manager.save(InventoryEntity, inventory);
      }

      const deleteResult = await queryRunner.manager.delete(BuyEntity, {
        buyId: id,
      });

      await queryRunner.commitTransaction();
      return deleteResult;
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
}
