import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => SaleEntity, (sale: SaleEntity) => sale.balanceDetails)
  @JoinColumn({ name: 'sale' })
  sale: SaleEntity;

  @ManyToOne(
    () => RequestEntity,
    (request: RequestEntity) => request.balanceDetails,
  )
  @JoinColumn({ name: 'request' })
  request: RequestEntity;

  @ManyToOne(
    () => ExpenseEntity,
    (expense: ExpenseEntity) => expense.balanceDetails,
  )
  @JoinColumn({ name: 'expense' })
  expense: ExpenseEntity;

  @Column({ name: 'cash', type: 'int' })
  cash: number;

  @Column({ name: 'change', type: 'int' })
  change: number;
}
