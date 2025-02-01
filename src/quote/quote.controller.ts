import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { QuoteService } from "./quote.service";
import { UtilitiesService } from "../_utilities/_utilities.service";
import { QuoteEntity } from "./quote.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('quotes')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly utilitiesService: UtilitiesService,
  ) {}

  @Get()
  async findAllQuotes(@Query() variables: any): Promise<QuoteEntity[]>{
    const { populate, filters } = this.utilitiesService.handlePopulate(variables);
    return await this.quoteService.findAllQuotes(populate, filters);
  }

  @Get(':id')
  async findQuoteById(@Param('id') id: number, @Query() variables: any): Promise<QuoteEntity> {
    const { populate, filters } = this.utilitiesService.handlePopulate(variables);
    return await this.quoteService.findQuoteById(id, populate, filters);
  }

  @Post()
  async createQuote(@Body() quote: QuoteEntity): Promise<QuoteEntity> {
    return await this.quoteService.createQuote(quote);
  }

  @Put(':id')
  async updateQuote(@Param('id') id: number, @Body() quote: QuoteEntity): Promise<UpdateResult> {
    return await this.quoteService.updateQuote(id, quote);
  }

  @Delete(':id')
  async deleteQuote(@Param('id') id: number): Promise<DeleteResult> {
    return await this.quoteService.deleteQuote(id);
  }
}
