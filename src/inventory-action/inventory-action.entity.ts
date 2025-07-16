import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../user/user.entity';

@Entity('inventory_action')
export class InventoryActionEntity {
  @PrimaryGeneratedColumn({ name: 'inventory_action_id', type: 'int' })
  inventoryActionId: number;

  @ManyToOne(
    () => ProductEntity,
    (product: ProductEntity) => product.inventoryActions,
  )
  @JoinColumn({ name: 'product' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.inventoryActions)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @Column({ name: 'date', type: 'date' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'action', type: 'varchar', length: 1 })
  action: string;

  @Column({ name: 'previous_amount', type: 'float' })
  previousAmount: number;

  @Column({ name: 'modified_amount', type: 'float' })
  modifiedAmount: number;
}
