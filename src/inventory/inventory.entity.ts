import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn({ name: 'inventory_id', type: 'int' })
  inventoryId: number;

  @OneToOne(() => ProductEntity, (product: ProductEntity) => product.inventory)
  product: ProductEntity;

  @Column({ name: 'amount', type: 'int' })
  amount: number;
}
