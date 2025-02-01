import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { BalanceEntity } from "./balance.entity";

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
  ) {}

  async findAllBalances(populate: [], filters: {}): Promise<BalanceEntity[]> {
    try {
      return await this.balanceRepository.find({
        relations: populate,
        where: filters
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async findBalanceById(id: number, populate: [], filters: {}): Promise<BalanceEntity>  {
    const paramsWithId = {...filters, balanceId: id};
      try {
        const balance = await this.balanceRepository.find({
          relations: populate,
          where: paramsWithId
        })
        return balance ? balance[0] : new BalanceEntity();
      } catch(error) {
        console.log(error);
        throw new HttpException('error when trying to connect to the server', 500);
      }
  }

  async createBalance(balance: BalanceEntity): Promise<BalanceEntity> {
    try {
      return await this.balanceRepository.save(balance);
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async updateBalance(id: number, balance: BalanceEntity): Promise<UpdateResult> {
    try {
      return await this.balanceRepository.update({balanceId: id}, balance);
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async deleteBalance(id: number): Promise<DeleteResult> {
    try {
      return this.balanceRepository.delete({balanceId: id});
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }
}
