import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestDetailEntity } from "./request-detail.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class RequestDetailService {
  constructor(
    @InjectRepository(RequestDetailEntity)
    private readonly requestRepository: Repository<RequestDetailEntity>,
  ) {}

  async findAllRequestDetails(populate: [], filters: {}): Promise<RequestDetailEntity[]> {
    try {
      return await this.requestRepository.find({
        relations: populate,
        where: filters
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async findRequestDetailById(id: number, populate: [], filters: {}): Promise<RequestDetailEntity> {
    try {
      return await this.requestRepository.findOne({
        relations: populate,
        where: { ...filters, requestDetailId: id }
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async createRequestDetail(requestDetail: RequestDetailEntity): Promise<RequestDetailEntity> {
    try {
      return await this.requestRepository.save(requestDetail);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async updateRequestDetail(id: number, requestDetail: RequestDetailEntity): Promise<UpdateResult> {
    try {
      return await this.requestRepository.update(id, requestDetail);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async deleteRequestDetail(id: number): Promise<DeleteResult> {
    try {
      return await this.requestRepository.delete(id);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }
}
