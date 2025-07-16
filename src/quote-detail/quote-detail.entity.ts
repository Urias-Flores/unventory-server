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

  @Column({ name: 'amount', type: 'float' })
  amount: number;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ name: 'isv', type: 'float' })
  isv: number;

  @Column({ name: 'discount', type: 'float' })
  discount: number;
}
