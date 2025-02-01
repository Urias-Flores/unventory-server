import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ClientEntity } from '../client/client.entity';
import { RequestDetailEntity } from '../request-detail/request-detail.entity';
import { PayEntity } from '../pay/pay.entity';
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

  @Column({ name: 'state', type: 'varchar', length: 1 })
  state: string;

  @Column({ name: 'rtn', type: 'varchar', length: 20, nullable: true })
  rtn: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @OneToMany(
    () => RequestDetailEntity,
    (requestDetail: RequestDetailEntity) => requestDetail.request,
  )
  requestDetails: RequestDetailEntity[];

  @OneToMany(() => PayEntity, (pay: PayEntity) => pay.request)
  pays: PayEntity[];

  @OneToMany(
    () => BalanceDetailEntity,
    (balanceDetail: BalanceDetailEntity) => balanceDetail.sale,
  )
  balanceDetails: BalanceDetailEntity[];
}
