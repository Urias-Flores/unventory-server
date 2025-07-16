import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseEntity } from './expense.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async findAllExpenses(populate: [], filters: {}): Promise<ExpenseEntity[]> {
    try {
      return await this.expenseRepository.find({
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

  async findExpenseById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<ExpenseEntity> {
    const filtersWithId = { ...filters, expenseId: id };
    try {
      return await this.expenseRepository.findOne({
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

  async createExpense(expense: ExpenseEntity): Promise<ExpenseEntity> {
    try {
      return await this.expenseRepository.save(expense);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateExpense(
    id: number,
    expense: ExpenseEntity,
  ): Promise<UpdateResult> {
    try {
      return await this.expenseRepository.update({ expenseId: id }, expense);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteExpense(id: number): Promise<DeleteResult> {
    try {
      return await this.expenseRepository.delete({ expenseId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
