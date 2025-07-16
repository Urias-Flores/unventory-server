import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BalanceDetailEntity } from '../balance-detail/balance-detail.entity';

@Entity('balance')
export class BalanceEntity {
  @PrimaryGeneratedColumn({ name: 'balance_id', type: 'int' })
  balanceId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.balance)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @Column({ name: 'initial_balance', type: 'float' })
  initialBalance: number;

  @Column({ name: 'final_system_balance', type: 'float' })
  finalSystemBalance: number;

  @Column({ name: 'final_user_balance', type: 'float' })
  finalUserBalance: number;

  @OneToMany(
    () => BalanceDetailEntity,
    (balanceDetail: BalanceDetailEntity) => balanceDetail.balance,
  )
  balanceDetails: BalanceDetailEntity[];
}
