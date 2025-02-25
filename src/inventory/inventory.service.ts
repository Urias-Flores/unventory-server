import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async findAllInventory(
    populate: [],
    filters: {},
  ): Promise<InventoryEntity[]> {
    try {
      return await this.inventoryRepository.find({
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

  async findInventoryById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<InventoryEntity> {
    const filtersWithId = { ...filters, inventoryId: id };
    try {
      return await this.inventoryRepository.findOne({
        relations: populate,
        where: filtersWithId,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createInventory(inventory: InventoryEntity): Promise<InventoryEntity> {
    try {
      return await this.inventoryRepository.save(inventory);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateInventory(
    id: number,
    inventory: InventoryEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.inventoryRepository.update(
        { inventoryId: id },
        inventory,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteInventory(id: number): Promise<DeleteResult> {
    try {
      return await this.inventoryRepository.delete({ inventoryId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
