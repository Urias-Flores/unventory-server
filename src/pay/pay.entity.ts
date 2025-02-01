import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SaleEntity } from '../sale/sale.entity';
import { RequestEntity } from '../request/request.entity';
import { BuyEntity } from '../buy/buy.entity';

@Entity('pay')
export class PayEntity {
  @PrimaryGeneratedColumn({ name: 'pay_id', type: 'int' })
  payId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.pays)
  @JoinColumn({ name: 'user' })
  user: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @Column({ name: 'type', type: 'varchar', length: 1 })
  type: string;

  @ManyToOne(() => SaleEntity, (sale: SaleEntity) => sale.pays)
  @JoinColumn({ name: 'sale' })
  sale: SaleEntity;

  @ManyToOne(() => RequestEntity, (request: RequestEntity) => request.pays)
  @JoinColumn({ name: 'request' })
  request: RequestEntity;

  @ManyToOne(() => BuyEntity, (buy: BuyEntity) => buy.pays)
  @JoinColumn({ name: 'buy' })
  buy: BuyEntity;

  @Column({ name: 'total', type: 'double' })
  total: number;
}
