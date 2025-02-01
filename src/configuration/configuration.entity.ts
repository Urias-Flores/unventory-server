import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('configuration')
export class ConfigurationEntity {
  @PrimaryGeneratedColumn({ name: 'configuration_id', type: 'int' })
  configurationId: number;

  @Column({ name: 'name', type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'data', type: 'varchar', length: 100 })
  data: string;

  @Column({ name: 'extra', type: 'varchar', length: 100, nullable: true })
  extra: string;
}
