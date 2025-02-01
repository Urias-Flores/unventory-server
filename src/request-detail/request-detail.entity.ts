import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequestEntity } from '../request/request.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('request_detail')
export class RequestDetailEntity {
  @PrimaryGeneratedColumn({ name: 'request_detail_id', type: 'int' })
  requestDetailId: number;

  @ManyToOne(
    () => RequestEntity,
    (request: RequestEntity) => request.requestDetails,
  )
  @JoinColumn({ name: 'request' })
  request: RequestEntity;

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.requestDetails,
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
