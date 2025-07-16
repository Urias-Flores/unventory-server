import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { BrandEntity } from '../brand/brand.entity';
import { BuyDetailEntity } from '../buy-detail/buy-detail.entity';
import { QuoteDetailEntity } from '../quote-detail/quote-detail.entity';
import { RequestDetailEntity } from '../request-detail/request-detail.entity';
import { SaleDetailEntity } from '../sale-detail/sale-detail.entity';
import { InventoryEntity } from '../inventory/inventory.entity';
import { InventoryActionEntity } from '../inventory-action/inventory-action.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'product_id', type: 'int' })
  productId: number;

  @ManyToOne(
    () => CategoryEntity,
    (category: CategoryEntity) => category.products,
  )
  @JoinColumn({ name: 'category' })
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand: BrandEntity) => brand.products)
  @JoinColumn({ name: 'brand' })
  brand: BrandEntity;

  @Column({ name: 'description', type: 'varchar', length: 100 })
  description: string;

  @Column({ name: 'bar_code', type: 'varchar', length: 100, nullable: true })
  barCode: string;

  @Column({ name: 'units', type: 'varchar', length: 10, nullable: true })
  units: string;

  @Column({ name: 'min_amount', type: 'int' })
  minAmount: number;

  @Column({ name: 'buy_price', type: 'float' })
  buyPrice: number;

  @Column({ name: 'sale_price', type: 'float' })
  salePrice: number;

  @OneToOne(
    () => InventoryEntity,
    (inventory: InventoryEntity) => inventory.product,
  )
  @JoinColumn({ name: 'inventory' })
  inventory: InventoryEntity;

  @OneToMany(
    () => BuyDetailEntity,
    (buyDetail: BuyDetailEntity) => buyDetail.product,
  )
  buyDetails: BuyDetailEntity[];

  @OneToMany(
    () => QuoteDetailEntity,
    (quoteDetail: QuoteDetailEntity) => quoteDetail.product,
  )
  quoteDetails: QuoteDetailEntity[];

  @OneToMany(
    () => RequestDetailEntity,
    (requestDetail: RequestDetailEntity) => requestDetail.product,
  )
  requestDetails: RequestDetailEntity[];

  @OneToMany(
    () => SaleDetailEntity,
    (saleDetail: SaleDetailEntity) => saleDetail.product,
  )
  saleDetails: SaleDetailEntity[];

  @OneToMany(
    () => InventoryActionEntity,
    (inventoryAction: InventoryActionEntity) => inventoryAction.product,
  )
  inventoryActions: InventoryActionEntity[];

  constructor(productId: number) {
    this.productId = productId;
  }
}
