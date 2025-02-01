import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RequestService } from "./request.service";
import { UtilitiesService } from "../_utilities/_utilities.service";
import { RequestEntity } from "./request.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly utilities: UtilitiesService,
  ) {}

  @Get()
  async findAllRequests(@Query() variables: any): Promise<RequestEntity[]> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.requestService.findAllRequests(populate, filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query() variables: any): Promise<RequestEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.requestService.findRequestById(id, populate, filters);
  }

  @Post()
  async createRequest(@Body() request: RequestEntity):Promise<RequestEntity> {
    return await this.requestService.createRequest(request);
  }

  @Put(':id')
  async updateRequest(@Param('id') id: number, @Body() request: RequestEntity):Promise<UpdateResult> {
    return await this.requestService.updateRequest(id, request);
  }

  @Delete(':id')
  async deleteRequest(@Param('id') id: number):Promise<DeleteResult> {
    return await this.requestService.deleteRequest(id);
  }
}
