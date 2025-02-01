import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SupplierEntity } from '../supplier/supplier.entity';
import { BuyDetailEntity } from '../buy-detail/buy-detail.entity';
import { PayEntity } from '../pay/pay.entity';

@Entity('buy')
export class BuyEntity {
  @PrimaryGeneratedColumn({ name: 'buy_id', type: 'int' })
  buyId: number;

  @Column({ name: 'bill_id', type: 'varchar', length: 30 })
  billId: string;

  @ManyToOne(() => UserEntity, (user) => user.buys)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => SupplierEntity, (supplier: SupplierEntity) => supplier.buys)
  @JoinColumn({ name: 'supplier' })
  supplier: SupplierEntity;

  @Column({ name: 'state', type: 'varchar', length: 1 })
  state: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @Column({ name: 'buy_date', type: 'date' })
  buyDate: Date;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: Date;

  @OneToMany(
    () => BuyDetailEntity,
    (buyDetail: BuyDetailEntity) => buyDetail.buy,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  buyDetails: BuyDetailEntity[];

  @OneToMany(() => PayEntity, (pay: PayEntity) => pay.buy)
  pays: PayEntity[];

  constructor(id: number) {
    this.buyId = id;
  }
}
