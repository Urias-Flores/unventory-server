import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from './supplier.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
  ) {}

  async findAllSuppliers(
    populate: [],
    filters: object,
  ): Promise<SupplierEntity[]> {
    try {
      return await this.supplierRepository.find({
        relations: populate,
        where: filters,
        order: { name: 'ASC' },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to get suppliers', 500);
    }
  }

  async findAllSupplierById(
    id: number,
    populate: [],
    filters: object,
  ): Promise<SupplierEntity> {
    try {
      return await this.supplierRepository.findOne({
        relations: populate,
        where: { ...filters, supplierId: id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to get supplierById', 500);
    }
  }

  async createSupplier(supplier: SupplierEntity): Promise<SupplierEntity> {
    try {
      supplier.balance = 0;
      return await this.supplierRepository.save(supplier);
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to create supplier', 500);
    }
  }

  async updateSupplier(
    id: number,
    supplier: SupplierEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.supplierRepository.update({ supplierId: id }, supplier);
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to update supplier', 500);
    }
  }

  async deleteSupplier(id: number): Promise<DeleteResult> {
    try {
      return await this.supplierRepository.delete({ supplierId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to delete supplier', 500);
    }
  }
}
