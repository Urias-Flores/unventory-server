import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BuyEntity } from '../buy/buy.entity';

@Entity('supplier')
export class SupplierEntity {
  @PrimaryGeneratedColumn({ name: 'supplier_id', type: 'int' })
  supplierId: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({
    name: 'rtn',
    type: 'varchar',
    length: 15,
    unique: true,
    nullable: true,
  })
  rtn: string;

  @Column({ name: 'email', type: 'varchar', length: 80, nullable: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ name: 'balance', type: 'float', default: 0 })
  balance: number;

  @OneToMany(() => BuyEntity, (buy: BuyEntity) => buy.supplier)
  buys: BuyEntity[];
}
