import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuoteEntity } from './quote.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(QuoteEntity)
    private readonly quoteRepository: Repository<QuoteEntity>,
  ) {}

  async findAllQuotes(populate: [], filters: {}): Promise<QuoteEntity[]> {
    try {
      return await this.quoteRepository.find({
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

  async findQuoteById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<QuoteEntity> {
    try {
      return await this.quoteRepository.findOne({
        relations: populate,
        where: { ...filters, quoteId: id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createQuote(quote: QuoteEntity): Promise<QuoteEntity> {
    try {
      quote.date = new Date();
      quote.time = new Date();
      return this.quoteRepository.save(quote);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateQuote(id: number, quote: QuoteEntity): Promise<UpdateResult> {
    try {
      return await this.quoteRepository.update({ quoteId: id }, quote);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteQuote(id: number): Promise<DeleteResult> {
    try {
      return this.quoteRepository.delete({ quoteId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
