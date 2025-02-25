import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ClientEntity } from '../client/client.entity';
import { QuoteDetailEntity } from '../quote-detail/quote-detail.entity';

@Entity('quote')
export class QuoteEntity {
  @PrimaryGeneratedColumn({ name: 'quote_id', type: 'int' })
  quoteId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.quotes)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.quotes)
  @JoinColumn({ name: 'client' })
  client: ClientEntity;

  @Column({ name: 'name', type: 'varchar', length: 80 })
  name: string;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @OneToMany(
    () => QuoteDetailEntity,
    (quoteDetail: QuoteDetailEntity) => quoteDetail.quote,
  )
  quoteDetails: QuoteDetailEntity[];
}
