import { HttpException, Inject, Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { EmployeeEntity } from "./employee.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>
  ){}

  async findAllEmployees(populate: [], filters: {}): Promise<EmployeeEntity[]> {
    try {
      return await this.employeeRepository.find({
        relations: populate,
        where: filters
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async findEmployeeById(id: number, populate: [], filters: {}): Promise<EmployeeEntity> {
    try {
      const filtersWithId = {...filters, employeeId: id};
      const employee = await this.employeeRepository.find({
        relations: populate,
        where: filtersWithId
      })
      return employee ? employee[0] : new EmployeeEntity();
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async createEmployee(employee: EmployeeEntity): Promise<EmployeeEntity> {
    try {
      return await this.employeeRepository.save(employee);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async updateEmployee(id: number, employee: EmployeeEntity): Promise<UpdateResult> {
    try {
      return await this.employeeRepository.update({employeeId: id},employee);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async deleteEmployee(id: number): Promise<DeleteResult> {
    try {
      return await this.employeeRepository.delete(id);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }
}
