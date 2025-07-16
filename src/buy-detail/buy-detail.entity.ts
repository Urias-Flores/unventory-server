import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BuyEntity } from '../buy/buy.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('buy_detail')
export class BuyDetailEntity {
  @PrimaryGeneratedColumn({ name: 'buy_detail_id', type: 'int' })
  buyDetailId: number;

  @ManyToOne(() => BuyEntity, (buy: BuyEntity) => buy.buyDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'buy' })
  buy: BuyEntity;

  @ManyToOne(() => ProductEntity, (product) => product.buyDetails)
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
