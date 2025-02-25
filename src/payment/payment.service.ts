import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './payment.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SaleEntity } from '../sale/sale.entity';
import { RequestEntity } from '../request/request.entity';
import { BuyEntity } from '../buy/buy.entity';
import { SaleDetailEntity } from '../sale-detail/sale-detail.entity';
import { RequestDetailEntity } from '../request-detail/request-detail.entity';
import { BuyDetailEntity } from '../buy-detail/buy-detail.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly payRepository: Repository<PaymentEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    @InjectRepository(RequestEntity)
    private readonly requestRepository: Repository<RequestEntity>,
    @InjectRepository(BuyEntity)
    private readonly buyRepository: Repository<BuyEntity>,
    private readonly datasource: DataSource,
  ) {}

  async findAllPays(populate: [], filters: {}) {
    try {
      return this.payRepository.find({
        relations: populate,
        where: filters,
        order: {
          date: 'DESC',
          time: 'DESC',
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async findPayById(id: number, populate: [], filters: {}) {
    const filtersWithId = { ...filters, payId: id };
    try {
      return this.payRepository.findOne({
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

  async createPay(pay: PaymentEntity): Promise<PaymentEntity> {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      pay.date = new Date();
      pay.time = new Date();
      const payResult = await queryRunner.manager.save(PaymentEntity, pay);

      if (pay.type === 'S') {
        const sale = await this.saleRepository.findOne({
          relations: ['pays', 'saleDetails'],
          where: {
            saleId: Number(pay.sale),
          },
        });
        if (!(sale instanceof SaleEntity)) {
          throw new HttpException(
            'La venta ingresada no fue encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
        const totalSale = sale.saleDetails.reduce(
          (value: number, saleDetail: SaleDetailEntity) =>
            value +
            (saleDetail.amount * saleDetail.price - saleDetail.discount),
          0,
        );
        const totalPays = sale.pays.reduce(
          (value: number, pay: PaymentEntity) => value + pay.total,
          pay.total,
        );
        if (totalSale === totalPays) {
          sale.state = 'P';
          delete sale.pays;
          delete sale.saleDetails;

          await queryRunner.manager.save(SaleEntity, sale);
        }
      }
      if (pay.type === 'R') {
        const request = await this.requestRepository.findOne({
          relations: ['pays', 'requestDetails'],
          where: {
            requestId: Number(pay.request),
          },
        });
        if (!(request instanceof RequestEntity)) {
          throw new HttpException(
            'La solicitud ingresada no fue encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
        const totalRequest = request.requestDetails.reduce(
          (value: number, requestDetail: RequestDetailEntity) =>
            value +
            (requestDetail.amount * requestDetail.price -
              requestDetail.discount),
          0,
        );
        const totalPays = request.pays.reduce(
          (value: number, pay: PaymentEntity) => value + pay.total,
          pay.total,
        );
        if (totalRequest === totalPays) {
          request.state = 'P';
          delete request.pays;
          delete request.requestDetails;
          await queryRunner.manager.save(RequestEntity, request);
        }
      }
      if (pay.type === 'B') {
        const buy = await this.buyRepository.findOne({
          relations: ['pays', 'buyDetails'],
          where: {
            buyId: Number(pay.buy),
          },
        });
        if (!(buy instanceof BuyEntity)) {
          throw new HttpException(
            'La compra ingresada no fue encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
        const totalBuy = buy.buyDetails.reduce(
          (value: number, buyDetail: BuyDetailEntity) =>
            value + (buyDetail.amount * buyDetail.price - buyDetail.discount),
          0,
        );
        const totalPays = buy.pays.reduce(
          (value: number, pay: PaymentEntity) => value + pay.total,
          pay.total,
        );
        console.log('total buy: ' + totalBuy);
        console.log('total paid: ' + totalPays);
        if (totalBuy === totalPays) {
          buy.state = 'P';
          delete buy.pays;
          delete buy.buyDetails;
          await queryRunner.manager.save(BuyEntity, buy);
        }
      }

      await queryRunner.commitTransaction();
      return payResult;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async updatePay(id: number, pay: PaymentEntity): Promise<UpdateResult> {
    try {
      return await this.payRepository.update({ payId: id }, pay);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }

  async deletePay(id: number): Promise<DeleteResult> {
    try {
      return await this.payRepository.delete(id);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'error when trying to connect to the server',
        500,
      );
    }
  }
}
