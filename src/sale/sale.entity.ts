import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ClientEntity } from '../client/client.entity';
import { SaleDetailEntity } from '../sale-detail/sale-detail.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { BalanceDetailEntity } from '../balance-detail/balance-detail.entity';

@Entity('sale')
export class SaleEntity {
  @PrimaryGeneratedColumn({ name: 'sale_id', type: 'int' })
  saleId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.sales)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.sales)
  @JoinColumn({ name: 'client' })
  client: ClientEntity;

  @Column({ name: 'state', type: 'varchar', length: 1 })
  state: string;

  @Column({ name: 'type', type: 'varchar', length: 2, nullable: true })
  type: string;

  @Column({
    name: 'payment_method',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  paymentMethod: string;

  @Column({ name: 'name', type: 'varchar', length: 120, nullable: true })
  name: string;

  @Column({ name: 'rtn', type: 'varchar', length: 20, nullable: true })
  rtn: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @OneToMany(
    () => SaleDetailEntity,
    (saleDetail: SaleDetailEntity) => saleDetail.sale,
  )
  saleDetails: SaleDetailEntity[];

  @OneToMany(() => PaymentEntity, (pay: PaymentEntity) => pay.sale)
  pays: PaymentEntity[];

  @OneToOne(
    () => BalanceDetailEntity,
    (balanceDetail: BalanceDetailEntity) => balanceDetail.sale,
  )
  @JoinColumn({ name: 'balance_detail' })
  balanceDetail: BalanceDetailEntity;
}
