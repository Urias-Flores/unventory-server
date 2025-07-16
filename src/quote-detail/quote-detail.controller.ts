import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QuoteDetailService } from './quote-detail.service';
import { UtilitiesService } from '../_utilities/_utilities.service';
import { QuoteDetailEntity } from './quote-detail.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('quote-details')
export class QuoteDetailController {
  constructor(
    private readonly quoteDetailService: QuoteDetailService,
    private readonly utilitiesService: UtilitiesService,
  ) {}

  @Get()
  async findAllQuoteDetails(
    @Query() variables: any,
  ): Promise<QuoteDetailEntity[]> {
    const { populate, filters } =
      this.utilitiesService.handlePopulate(variables);
    return await this.quoteDetailService.findAllQuoteDetails(populate, filters);
  }

  @Get(':id')
  async findOneQuoteDetail(
    @Param('id') id: number,
    @Query() variables: any,
  ): Promise<QuoteDetailEntity> {
    const { populate, filters } =
      this.utilitiesService.handlePopulate(variables);
    return await this.quoteDetailService.findQuoteDetailById(
      id,
      populate,
      filters,
    );
  }

  @Post()
  async createQuoteDetail(
    @Body() quoteDetail: QuoteDetailEntity,
  ): Promise<QuoteDetailEntity> {
    return this.quoteDetailService.createQuoteDetail(quoteDetail);
  }

  @Put(':id')
  async updateQuoteDetail(
    @Param('id') id: number,
    @Body() quoteDetail: QuoteDetailEntity,
  ): Promise<UpdateResult> {
    return this.quoteDetailService.updateQuoteDetail(id, quoteDetail);
  }

  @Delete(':id')
  async deleteQuoteDetail(@Param('id') id: number): Promise<DeleteResult> {
    return this.quoteDetailService.deleteQuoteDetail(id);
  }
}
