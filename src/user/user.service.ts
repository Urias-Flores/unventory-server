import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { populate } from "dotenv";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(populate: [], filters: {}): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        relations: populate,
        where: filters
      })
    } catch (error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async findUserById(id: number, populate: [], filters: {}): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({
        relations: populate,
        where: { ...filters, userId: id }
      })
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async updateUser(id: number, user: UserEntity): Promise<UpdateResult> {
    try {
      return await this.userRepository.update({ userId: id }, user);
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete({ userId: id });
    } catch(error) {
      console.log(error);
      throw new HttpException('error when trying to connect to the server', 500);
    }
  }
}
