import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { SaleEntity } from '../sale/sale.entity';

@Entity('sale_detail')
export class SaleDetailEntity {
  @PrimaryGeneratedColumn({ name: 'sale_detail_id', type: 'int' })
  saleDetailId: number;

  @ManyToOne(() => SaleEntity, (sale: SaleEntity) => sale.saleDetails)
  @JoinColumn({ name: 'sale' })
  sale: SaleEntity;

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.saleDetails,
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
