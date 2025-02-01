import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn({ name: 'inventory_id', type: 'int' })
  inventoryId: number;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.inventory)
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @Column({ name: 'amount', type: 'int' })
  amount: number;
}
