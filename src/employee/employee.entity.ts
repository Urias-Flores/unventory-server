import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('employee')
export class EmployeeEntity {
  @PrimaryGeneratedColumn({ name: 'employee_id', type: 'int' })
  employeeId: number;

  @Column({ name: 'identity', type: 'varchar', length: 20 })
  identity: string;

  @Column({ name: 'name', type: 'varchar', length: 18 })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 80 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 80 })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20 })
  phone: string;

  @Column({ name: 'birthday', type: 'date' })
  birthday: Date;

  @Column({ name: 'address', type: 'varchar', length: 300 })
  address: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.employee)
  users: UserEntity[];
}
