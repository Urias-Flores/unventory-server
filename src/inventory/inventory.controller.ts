import { Controller, Get, Post, Put, Delete, Param, Query, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { InventoryEntity } from "./inventory.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAllInventory(@Query() params: any): Promise<InventoryEntity[]>{
    const populate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return this.inventoryService.findAllInventory(populate, params);
  }

  @Get(':id')
  async findInventoryById(@Param('id') id: number, @Query() params: any): Promise<InventoryEntity> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return this.inventoryService.findInventoryById(id, parsedPopulate, params);
  }

  @Post()
  async createInventory(@Body() body: InventoryEntity): Promise<InventoryEntity> {
    return this.inventoryService.createInventory(body);
  }

  @Put(':id')
  async updateInventory(@Param('id') id: number, @Body() inventory: InventoryEntity): Promise<UpdateResult> {
    return await this.inventoryService.updateInventory(id, inventory);
  }

  @Delete(':id')
  async deleteInventory(@Param('id') id: number): Promise<DeleteResult> {
    return await this.inventoryService.deleteInventory(id);
  }
}
