import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn({ name: 'notification_id', type: 'int' })
  notificationId: number;

  @Column({ name: 'date', type: 'int' })
  date: Date;

  @Column({ name: 'time', type: 'time' })
  time: Date;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'state', type: 'char', length: 1 })
  state: string;

  @Column({ name: 'target', type: 'char', length: 1 })
  target: string;
}
