import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ name: 'name', type: 'varchar', length: 60 })
  name: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.category)
  products: ProductEntity[];
}
