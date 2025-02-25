import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SaleDetailEntity } from '../sale-detail/sale-detail.entity';
import { InventoryEntity } from '../inventory/inventory.entity';
import { ProductEntity } from '../product/product.entity';
import { BalanceDetailEntity } from '../balance-detail/balance-detail.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    private readonly datasource: DataSource,
  ) {}

  async findAllSales(populate: [], filters: any): Promise<SaleEntity[]> {
    try {
      return await this.saleRepository.find({
        relations: populate,
        where: filters,
        order: { saleId: 'DESC' },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to get sales', 500);
    }
  }

  async findSaleById(
    id: number,
    populate: [],
    filters: any,
  ): Promise<SaleEntity> {
    try {
      return await this.saleRepository.findOne({
        relations: populate,
        where: { ...filters, saleId: id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to find sale', 500);
    }
  }

  async createSale(sale: SaleEntity): Promise<SaleEntity> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const saleDetails = sale.saleDetails;
    delete sale.saleDetails;

    const balanceDetail = sale.balanceDetail;
    delete sale.balanceDetail;

    try {
      sale.date = new Date();
      sale.time = new Date();

      const savedBalanceDetail = await queryRunner.manager.save(
        BalanceDetailEntity,
        balanceDetail,
      );

      if (!savedBalanceDetail.balanceDetailId) {
        throw new HttpException('error when trying to save balance', 500);
      }

      sale.balanceDetail = savedBalanceDetail;
      const savedSale: SaleEntity = await queryRunner.manager.save(
        SaleEntity,
        sale,
      );

      if (!savedSale.saleId) {
        throw new HttpException('error when trying to save sale', 500);
      }

      for (const saleDetail of saleDetails) {
        saleDetail.sale = savedSale;

        const savedSaleDetail = await queryRunner.manager.save(
          SaleDetailEntity,
          saleDetail,
        );

        const inventory = await this.inventoryRepository.findOne({
          where: {
            product: new ProductEntity(Number(savedSaleDetail.product)),
          },
        });

        console.log(inventory);

        if (!inventory) {
          throw new HttpException(
            `Product ${savedSaleDetail.product} can not be found`,
            HttpStatus.NOT_FOUND,
          );
        }

        inventory.amount = inventory.amount - savedSaleDetail.amount;
        await queryRunner.manager.save(InventoryEntity, inventory);
      }
      await queryRunner.commitTransaction();
      return savedSale;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException('error when trying to create sale', 500);
    } finally {
      await queryRunner.release();
    }
  }

  async updateSale(id: number, sale: SaleEntity): Promise<UpdateResult> {
    try {
      return await this.saleRepository.update({ saleId: id }, sale);
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to create sale', 500);
    }
  }

  async deleteSale(id: number): Promise<DeleteResult> {
    try {
      return await this.saleRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to delete sale', 500);
    }
  }
}
