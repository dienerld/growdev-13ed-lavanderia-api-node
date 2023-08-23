import { Column, Entity } from 'typeorm';
import { EMachine } from '../../enums/machine.enum';
import { ETime } from '../../enums/time.enum';
import { BaseEntity } from './base.entity';

@Entity({ name: 'bookings' })
export class BookingsEntity extends BaseEntity {
  @Column({ type: 'int', enum: ETime, name: 'hour' })
  time!: ETime;

  @Column()
  date!: Date;

  @Column({ type: 'int', enum: EMachine })
  machine!: EMachine;

  @Column({ name: 'apartment_fk' })
  userId!: string;
}
