import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ExpenseService } from "./expense.service";
import { ExpenseEntity } from "./expense.entity";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async findAllExpenses(@Query() params: any){
    const populate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return this.expenseService.findAllExpenses(populate, params);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query() params: any): Promise<ExpenseEntity> {
    const populate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.expenseService.findExpenseById(id, populate, params);
  }

  @Post()
  async createExpense(@Body() expense: ExpenseEntity): Promise<ExpenseEntity> {
    const date = new Date();
    expense.date = date;
    expense.time = date;
    return await this.expenseService.createExpense(expense);
  }

  @Put(':id')
  async updateExpense(@Param('id') id: number, @Body() expense: ExpenseEntity): Promise<UpdateResult> {
    return await this.expenseService.updateExpense(id, expense);
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: number): Promise<DeleteResult> {
    return await this.expenseService.deleteExpense(id);
  }
}
