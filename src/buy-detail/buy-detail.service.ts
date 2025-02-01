import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyDetailEntity } from './buy-detail.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BuyDetailService {
  constructor(
    @InjectRepository(BuyDetailEntity)
    private readonly buyDetailRepository: Repository<BuyDetailEntity>,
  ) {}

  async findAllBuyDetails(
    populate: [],
    filters: {},
  ): Promise<BuyDetailEntity[]> {
    try {
      return await this.buyDetailRepository.find({
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

  async findBuyDetailById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<BuyDetailEntity> {
    const filtersWithId = { ...filters, buyDetailId: id };
    try {
      const buyDetail = await this.buyDetailRepository.find({
        relations: populate,
        where: filtersWithId,
      });
      return buyDetail ? buyDetail[0] : new BuyDetailEntity();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createBuyDetail(buyDetail: BuyDetailEntity): Promise<BuyDetailEntity> {
    try {
      return await this.buyDetailRepository.save(buyDetail);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateBuyDetail(
    id: number,
    buyDetail: BuyDetailEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.buyDetailRepository.update(
        { buyDetailId: id },
        buyDetail,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteBuyDetail(id: number): Promise<DeleteResult> {
    try {
      return await this.buyDetailRepository.delete({ buyDetailId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
