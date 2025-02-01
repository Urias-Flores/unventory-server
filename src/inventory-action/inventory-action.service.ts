import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryActionEntity } from './inventory-action.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InventoryEntity } from '../inventory/inventory.entity';

@Injectable()
export class InventoryActionService {
  constructor(
    @InjectRepository(InventoryActionEntity)
    private readonly inventoryActionRepository: Repository<InventoryActionEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async findAllInventoryActions(
    populate: [],
    filters: {},
  ): Promise<InventoryActionEntity[]> {
    try {
      return await this.inventoryActionRepository.find({
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

  async findInventoryActionById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<InventoryActionEntity> {
    const filtersWithId = { ...filters, inventoryActionId: id };
    try {
      return await this.inventoryActionRepository.findOne({
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

  async createInventoryAction(
    inventoryAction: InventoryActionEntity,
  ): Promise<InventoryActionEntity> {
    try {
      inventoryAction.date = new Date();
      inventoryAction.time = new Date();
      const inventoryActionInserted =
        await this.inventoryActionRepository.save(inventoryAction);
      if (!inventoryActionInserted.inventoryActionId) {
        throw new HttpException(
          'error when trying to connect to the server',
          500,
        );
      }

      await this.inventoryRepository.update(
        {
          product: inventoryAction.product,
        },
        {
          amount:
            inventoryActionInserted.previousAmount +
            inventoryAction.modifiedAmount,
        },
      );

      return inventoryActionInserted;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateInventoryAction(
    id: number,
    inventoryAction: InventoryActionEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.inventoryActionRepository.update(
        { inventoryActionId: id },
        inventoryAction,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteInventoryAction(id: number): Promise<DeleteResult> {
    try {
      return await this.inventoryActionRepository.delete({
        inventoryActionId: id,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
