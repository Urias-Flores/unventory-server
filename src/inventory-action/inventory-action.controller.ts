import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { InventoryActionEntity } from './inventory-action.entity';
import { InventoryActionService } from './inventory-action.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('inventory-actions')
export class InventoryActionController {
  constructor(
    private readonly inventoryActionService: InventoryActionService,
  ) {}

  @Get()
  async findAllInventoryAction(
    @Query() variables: any,
  ): Promise<InventoryActionEntity[]> {
    const populate = variables.populate ? variables.populate.split(',') : [];
    delete variables.populate;
    return await this.inventoryActionService.findAllInventoryActions(
      populate,
      variables,
    );
  }

  @Get(':id')
  async findInventoryActionById(
    @Query() variables: any,
    @Param('id') id: number,
  ): Promise<InventoryActionEntity> {
    const populate = variables.populate ? variables.populate.split(',') : [];
    delete variables.populate;
    return await this.inventoryActionService.findInventoryActionById(
      id,
      populate,
      variables,
    );
  }

  @Post()
  async createInventoryAction(
    @Body() inventoryAction: InventoryActionEntity,
  ): Promise<InventoryActionEntity> {
    return await this.inventoryActionService.createInventoryAction(
      inventoryAction,
    );
  }

  @Put(':id')
  async updateInventoryAction(
    @Param('id') id: number,
    @Body() inventoryAction: InventoryActionEntity,
  ): Promise<UpdateResult> {
    return await this.inventoryActionService.updateInventoryAction(
      id,
      inventoryAction,
    );
  }

  @Delete(':id')
  async deleteInventoryAction(@Param('id') id: number): Promise<DeleteResult> {
    return await this.inventoryActionService.deleteInventoryAction(id);
  }
}
