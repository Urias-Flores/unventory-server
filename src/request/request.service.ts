import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestEntity } from './request.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BalanceDetailEntity } from '../balance-detail/balance-detail.entity';
import { ProductEntity } from '../product/product.entity';
import { InventoryEntity } from '../inventory/inventory.entity';
import { RequestDetailEntity } from '../request-detail/request-detail.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    private readonly datasource: DataSource,
  ) {}

  async findAllRequests(populate: [], filters: any): Promise<RequestEntity[]> {
    try {
      return await this.requestRepository.find({
        relations: populate,
        where: filters,
        order: { requestId: 'DESC' },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async findRequestById(
    id: number,
    populate: [],
    filters: any,
  ): Promise<RequestEntity> {
    try {
      return await this.requestRepository.findOne({
        relations: populate,
        where: { ...filters, requestId: id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createRequest(request: RequestEntity): Promise<RequestEntity> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const requestDetails = request.requestDetails;
    delete request.requestDetails;

    const balanceDetail = request.balanceDetail;
    delete request.balanceDetail;

    try {
      request.date = new Date();
      request.time = new Date();

      const savedBalanceDetail = await queryRunner.manager.save(
        BalanceDetailEntity,
        balanceDetail,
      );

      if (!savedBalanceDetail.balanceDetailId) {
        throw new HttpException('error when trying to save balance', 500);
      }

      request.balanceDetail = savedBalanceDetail;
      const savedRequest: RequestEntity = await queryRunner.manager.save(
        RequestEntity,
        request,
      );

      if (!savedRequest.requestId) {
        throw new HttpException('error when trying to save sale', 500);
      }

      for (const requestDetail of requestDetails) {
        requestDetail.request = savedRequest;

        const savedRequestDetail = await queryRunner.manager.save(
          RequestDetailEntity,
          requestDetail,
        );

        const inventory = await this.inventoryRepository.findOne({
          where: {
            product: new ProductEntity(Number(savedRequestDetail.product)),
          },
        });

        if (!inventory) {
          throw new HttpException(
            `Product ${savedRequestDetail.product} can not be found`,
            HttpStatus.NOT_FOUND,
          );
        }

        inventory.amount = inventory.amount - savedRequestDetail.amount;
        await queryRunner.manager.save(InventoryEntity, inventory);
      }
      await queryRunner.commitTransaction();
      return savedRequest;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateRequest(
    id: number,
    request: RequestEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.requestRepository.update(id, request);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteRequest(id: number): Promise<DeleteResult> {
    try {
      return await this.requestRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
