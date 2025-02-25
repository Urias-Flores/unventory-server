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
import { RequestDetailEntity } from '../request-detail/request-detail.entity';
import { PaymentEntity } from '../payment/payment.entity';
import { BalanceDetailEntity } from '../balance-detail/balance-detail.entity';

@Entity('request')
export class RequestEntity {
  @PrimaryGeneratedColumn({ name: 'request_id', type: 'int' })
  requestId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.requests)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.requests)
  @JoinColumn({ name: 'client' })
  client: ClientEntity;

  @Column({ name: 'type', type: 'varchar', length: 2, nullable: true })
  type: string;

  @Column({
    name: 'payment_method',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  paymentMethod: string;

  @Column({ name: 'state', type: 'varchar', length: 1 })
  state: string;

  @Column({ name: 'name', type: 'varchar', length: 80, nullable: true })
  name: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @OneToMany(
    () => RequestDetailEntity,
    (requestDetail: RequestDetailEntity) => requestDetail.request,
  )
  requestDetails: RequestDetailEntity[];

  @OneToMany(() => PaymentEntity, (pay: PaymentEntity) => pay.request)
  pays: PaymentEntity[];

  @OneToOne(
    () => BalanceDetailEntity,
    (balanceDetail: BalanceDetailEntity) => balanceDetail.sale,
  )
  @JoinColumn({ name: 'balance_detail' })
  balanceDetail: BalanceDetailEntity;
}
