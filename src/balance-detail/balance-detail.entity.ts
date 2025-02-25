import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { BalanceEntity } from '../balance/balance.entity';
import { SaleEntity } from '../sale/sale.entity';
import { RequestEntity } from '../request/request.entity';
import { ExpenseEntity } from '../expense/expense.entity';

@Entity('balance_detail')
export class BalanceDetailEntity {
  @PrimaryGeneratedColumn({ name: 'balance_detail_id', type: 'int' })
  balanceDetailId: number;

  @ManyToOne(
    () => BalanceEntity,
    (balance: BalanceEntity) => balance.balanceDetails,
  )
  @JoinColumn({ name: 'balance' })
  balance: BalanceEntity;

  @OneToOne(() => SaleEntity, (sale: SaleEntity) => sale.balanceDetail)
  sale: SaleEntity;

  @OneToOne(
    () => RequestEntity,
    (request: RequestEntity) => request.balanceDetail,
  )
  request: RequestEntity;

  @OneToOne(
    () => ExpenseEntity,
    (expense: ExpenseEntity) => expense.balanceDetails,
  )
  expense: ExpenseEntity;

  @Column({ name: 'cash', type: 'int' })
  cash: number;

  @Column({ name: 'change', type: 'double' })
  change: number;
}
