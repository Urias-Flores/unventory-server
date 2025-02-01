import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity('brand')
export class BrandEntity {
  @PrimaryGeneratedColumn({ name: 'brand_id', type: 'int' })
  brandId: number;

  @Column({ name: 'name', type: 'varchar', length: 60, unique: true })
  name: string;

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.brand)
  products: ProductEntity[];
}
