import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuoteEntity } from '../quote/quote.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('quote_detail')
export class QuoteDetailEntity {
  @PrimaryGeneratedColumn({ name: 'quote_detail_id', type: 'int' })
  quoteDetailId: number;

  @ManyToOne(() => QuoteEntity, (quote: QuoteEntity) => quote.quoteDetails)
  @JoinColumn({ name: 'quote' })
  quote: QuoteEntity;

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.quoteDetails,
  )
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @Column({ name: 'amount', type: 'double' })
  amount: number;

  @Column({ name: 'price', type: 'double' })
  price: number;

  @Column({ name: 'isv', type: 'double' })
  isv: number;

  @Column({ name: 'discount', type: 'double' })
  discount: number;
}
