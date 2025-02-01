import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuoteDetailEntity } from "./quote-detail.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class QuoteDetailService {
  constructor(
    @InjectRepository(QuoteDetailEntity)
    private readonly quoteDetailRepository: Repository<QuoteDetailEntity>
  ) {}

  async findAllQuoteDetails(populate:[], filters: {}): Promise<QuoteDetailEntity[]> {
    try {
      return await this.quoteDetailRepository.find({
        relations: populate,
        where: filters
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async findQuoteDetailById(id: number, populate: [], filters: {}): Promise<QuoteDetailEntity> {
    try {
      return this.quoteDetailRepository.findOne({
        relations: populate,
        where: { ...filters, quoteDetailId: id },
      });
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async createQuoteDetail(quote: QuoteDetailEntity): Promise<QuoteDetailEntity> {
    try {
      return await this.quoteDetailRepository.save(quote);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async updateQuoteDetail(id: number, quote: QuoteDetailEntity): Promise<UpdateResult> {
    try {
      return await this.quoteDetailRepository.update({ quoteDetailId: id }, quote);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async deleteQuoteDetail(id: number): Promise<DeleteResult> {
    try {
      return await this.quoteDetailRepository.delete({quoteDetailId: id});
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }
}
