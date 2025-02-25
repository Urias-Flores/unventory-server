import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EmployeeEntity } from '../employee/employee.entity';
import { BalanceEntity } from '../balance/balance.entity';
import { ExpenseEntity } from '../expense/expense.entity';
import { BuyEntity } from '../buy/buy.entity';
import { QuoteEntity } from '../quote/quote.entity';
import { RequestEntity } from '../request/request.entity';
import { SaleEntity } from '../sale/sale.entity';
import { InventoryActionEntity } from '../inventory-action/inventory-action.entity';
import { PaymentEntity } from '../payment/payment.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => EmployeeEntity, (employee: EmployeeEntity) => employee.users)
  @JoinColumn({ name: 'employee' })
  employee: EmployeeEntity;

  @Column({ name: 'name', type: 'varchar', length: 80 })
  name: string;

  @Column({ name: 'password', type: 'varchar', length: 166 })
  password: string;

  @Column({ name: 'token', type: 'varchar', length: 6, nullable: true })
  token: string;

  @Column({ name: 'state', type: 'int' })
  state: number;

  @Column({ name: 'position', type: 'varchar', length: 1 })
  position: string;

  @OneToMany(() => BalanceEntity, (balance: BalanceEntity) => balance.user)
  balance: BalanceEntity[];

  @OneToMany(() => ExpenseEntity, (expense: ExpenseEntity) => expense.user)
  expenses: ExpenseEntity[];

  @OneToMany(() => BuyEntity, (buy: BuyEntity) => buy.user)
  buys: BuyEntity[];

  @OneToMany(() => QuoteEntity, (quote: QuoteEntity) => quote.user)
  quotes: QuoteEntity[];

  @OneToMany(() => RequestEntity, (request: RequestEntity) => request.user)
  requests: RequestEntity[];

  @OneToMany(() => SaleEntity, (sale: SaleEntity) => sale.user)
  sales: SaleEntity[];

  @OneToMany(
    () => InventoryActionEntity,
    (inventoryAction: InventoryActionEntity) => inventoryAction.product,
  )
  inventoryActions: InventoryActionEntity[];

  @OneToMany(() => PaymentEntity, (pay: PaymentEntity) => pay.user)
  pays: PaymentEntity[];
}
