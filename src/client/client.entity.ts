import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuoteEntity } from '../quote/quote.entity';
import { RequestEntity } from '../request/request.entity';
import { SaleEntity } from '../sale/sale.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn({ name: 'client_id', type: 'int' })
  clientId: number;

  @Column({ name: 'name', type: 'varchar', length: 60 })
  name: string;

  @Column({ name: 'document', type: 'varchar', length: 15, nullable: true })
  document: string;

  @Column({ name: 'rtn', type: 'varchar', length: 20, nullable: true })
  rtn: string;

  @Column({ name: 'email', type: 'varchar', length: 60, nullable: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ name: 'address', type: 'varchar', length: 300, nullable: true })
  address: string;

  @Column({ name: 'balance', type: 'float', default: 0 })
  balance: number;

  @OneToMany(() => QuoteEntity, (quote: QuoteEntity) => quote.client)
  quotes: QuoteEntity[];

  @OneToMany(() => RequestEntity, (request: RequestEntity) => request.client)
  requests: RequestEntity[];

  @OneToMany(() => SaleEntity, (sale: SaleEntity) => sale.client)
  sales: SaleEntity[];
}
