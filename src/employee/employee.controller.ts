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
import { EmployeeService } from './employee.service';
import { EmployeeEntity } from './employee.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees(@Query() params: any): Promise<EmployeeEntity[]> {
    const populate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.employeeService.findAllEmployees(populate, params);
  }

  @Get(':id')
  async getEmployee(
    @Param('id') id: number,
    @Query() params: any,
  ): Promise<EmployeeEntity> {
    const populate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.employeeService.findEmployeeById(id, populate, params);
  }

  @Post()
  async createEmployee(
    @Body() employee: EmployeeEntity,
  ): Promise<EmployeeEntity> {
    return this.employeeService.createEmployee(employee);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() employee: EmployeeEntity,
  ): Promise<UpdateResult> {
    return this.employeeService.updateEmployee(id, employee);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<DeleteResult> {
    return this.employeeService.deleteEmployee(id);
  }
}
