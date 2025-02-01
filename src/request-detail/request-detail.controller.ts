import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RequestDetailService } from "./request-detail.service";
import { UtilitiesService } from "../_utilities/_utilities.service";
import { RequestDetailEntity } from "./request-detail.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('request-details')
export class RequestDetailController {
  constructor(
    private readonly requestDetailService: RequestDetailService,
    private readonly utilities: UtilitiesService
  ) {}

  @Get()
  async findAllRequestDetails(@Query() variables: any): Promise<RequestDetailEntity[]> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.requestDetailService.findAllRequestDetails(populate, filters);
  }

  @Get(':id')
  async findRequestDetailById(@Param('id') id: number, @Query() variables: any): Promise<RequestDetailEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.requestDetailService.findRequestDetailById(id, populate, filters);
  }

  @Post()
  async createRequestDetailById(@Body() requestDetail: RequestDetailEntity): Promise<RequestDetailEntity> {
    return await this.requestDetailService.createRequestDetail(requestDetail);
  }

  @Put(':id')
  async updateRequestDetail(@Param('id') id: number, @Body() requestDetail: RequestDetailEntity): Promise<UpdateResult> {
    return await this.requestDetailService.updateRequestDetail(id, requestDetail);
  }

  @Delete(':id')
  async deleteRequestDetail(@Param('id') id: number): Promise<DeleteResult> {
    return await this.requestDetailService.deleteRequestDetail(id);
  }
}
