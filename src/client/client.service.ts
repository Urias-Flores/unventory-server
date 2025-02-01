import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAllClients(populate: [], filters: {}): Promise<ClientEntity[]> {
    try {
      return await this.clientRepository.find({
        relations: populate,
        where: filters,
        order: { name: 'ASC' },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async findClientById(
    id: number,
    populate: [],
    filters: {},
  ): Promise<ClientEntity> {
    const filtersWithId = { ...filters, clientId: id };
    try {
      const client = await this.clientRepository.find({
        relations: populate,
        where: filtersWithId,
      });
      return client ? client[0] : new ClientEntity();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async createClient(client: ClientEntity): Promise<ClientEntity> {
    try {
      return await this.clientRepository.save(client);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async updateClient(id: number, client: ClientEntity): Promise<UpdateResult> {
    try {
      return await this.clientRepository.update({ clientId: id }, client);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    try {
      return await this.clientRepository.delete({ clientId: id });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
