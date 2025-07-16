import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ClientService } from './client.service';
import { ClientEntity } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAllClients(@Query() params: string | any): Promise<any> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.clientService.findAllClients(parsedPopulate, params);
  }

  @Get(':id')
  async findClientById(
    @Param('id') id: number,
    @Query() params: string | any,
  ): Promise<any> {
    const parsedPopulate = params.populate ? params.populate.split(',') : [];
    delete params.populate;
    return await this.clientService.findClientById(id, parsedPopulate, params);
  }

  @Post()
  async createClient(@Body() client: ClientEntity): Promise<any> {
    return await this.clientService.createClient(client);
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: number,
    @Body() client: ClientEntity,
  ): Promise<UpdateResult> {
    return await this.clientService.updateClient(id, client);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: number): Promise<DeleteResult> {
    return await this.clientService.deleteClient(id);
  }
}
