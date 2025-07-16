import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BalanceDetailEntity } from './balance-detail.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BalanceDetailService {
  constructor(
    @InjectRepository(BalanceDetailEntity)
    private readonly balanceDetailRepository: Repository<BalanceDetailEntity>,
  ) {}

  async findAllBalanceDetail(
    populate: [],
    filters: {},
  ): Promise<BalanceDetailEntity[]> {
    try {
      return await this.balanceDetailRepository.find({
        relations: populate,
        where: filters,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async findBalanceById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<BalanceDetailEntity> {
    const paramsWithId = { ...filters, balanceDetailId: id };
    try {
      const balanceDetail = await this.balanceDetailRepository.find({
        relations: populate,
        where: paramsWithId,
      });
      return balanceDetail ? balanceDetail[0] : new BalanceDetailEntity();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createBalanceDetail(
    balanceDetail: BalanceDetailEntity,
  ): Promise<BalanceDetailEntity> {
    try {
      return await this.balanceDetailRepository.save(balanceDetail);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateBalanceDetail(
    id: number,
    balanceDetail: BalanceDetailEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.balanceDetailRepository.update(
        { balanceDetailId: id },
        balanceDetail,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteBalanceDetail(id: number): Promise<DeleteResult> {
    try {
      return this.balanceDetailRepository.delete({ balanceDetailId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
