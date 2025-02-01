import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BalanceDetailEntity } from '../balance-detail/balance-detail.entity';

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn({ name: 'expense_id', type: 'int' })
  expenseId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.expenses)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @Column({ name: 'description', type: 'varchar', length: 60 })
  description: string;

  @Column({ name: 'total', type: 'double' })
  total: number;

  @OneToMany(
    () => BalanceDetailEntity,
    (balanceDetail: BalanceDetailEntity) => balanceDetail.sale,
  )
  balanceDetails: BalanceDetailEntity[];
}
