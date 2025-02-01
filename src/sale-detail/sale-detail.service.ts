import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SaleDetailEntity } from "./sale-detail.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class SaleDetailService {
  constructor(
    @InjectRepository(SaleDetailEntity)
    private readonly saleDetailRepository: Repository<SaleDetailEntity>,
  ) {}

  async findAllSaleDetails(populate:[], filters: {}): Promise<SaleDetailEntity[]> {
    try {
      return await this.saleDetailRepository.find({
        relations: populate,
        where: filters
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to get sales', 500);
    }
  }

  async findSaleDetailById(id: number, populate: [], filters: {}): Promise<SaleDetailEntity> {
    try {
      return await this.saleDetailRepository.findOne({
        relations: populate,
        where: { ...filters, saleDetailId: id }
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to get sale details', 500);
    }
  }

  async createSaleDetail(saleDetail: SaleDetailEntity): Promise<SaleDetailEntity> {
    try {
      return await this.saleDetailRepository.save(saleDetail);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to create sale', 500);
    }
  }

  async updateSaleDetail(id: number, saleDetail: SaleDetailEntity): Promise<UpdateResult> {
    try {
      return await this.saleDetailRepository.update({ saleDetailId: id }, saleDetail);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to update sale', 500);
    }
  }

  async deleteSaleDetail(id: number): Promise<DeleteResult> {
    try {
      return await this.saleDetailRepository.delete({  saleDetailId: id });
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to delete sale', 500);
    }
  }
}
