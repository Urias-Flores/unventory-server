import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestEntity } from "./request.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>
  ) {}

  async findAllRequests(populate: [], filters: {}): Promise<RequestEntity[]> {
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

  async findRequestById(id: number, populate: [], filters: {}): Promise<RequestEntity> {
    try {
      return await this.requestRepository.findOne({
        relations: populate,
        where: { ...filters, requestId: id }
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async createRequest(request: RequestEntity): Promise<RequestEntity> {
    try {
      request.date = new Date();
      request.time = new Date();
      return await this.requestRepository.save(request);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async updateRequest(id: number, request: RequestEntity): Promise<UpdateResult> {
    try {
      return await this.requestRepository.update(id, request);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async deleteRequest(id: number): Promise<DeleteResult> {
    try {
      return await this.requestRepository.delete(id);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }
}
