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
import { UserService } from './user.service';
import { UtilitiesService } from '../_utilities/_utilities.service';
import { UserEntity } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly utilities: UtilitiesService,
  ) {}

  @Get()
  async findAllUsers(@Query() variables: any): Promise<UserEntity[]> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.userService.findAllUsers(populate, filters);
  }

  @Get(':id')
  async findUserById(
    @Param('id') id: number,
    @Query() variables: any,
  ): Promise<UserEntity> {
    const { populate, filters } = this.utilities.handlePopulate(variables);
    return await this.userService.findUserById(id, populate, filters);
  }

  @Post()
  async createUser(@Body() user: UserEntity): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: UserEntity,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }
}
