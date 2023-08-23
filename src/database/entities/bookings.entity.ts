import { Column, Entity } from 'typeorm';
import { EMachine } from '../../enums/machine.enum';
import { ETime } from '../../enums/time.enum';
import { BaseEntity } from './base.entity';

@Entity({ name: 'bookings' })
export class BookingsEntity extends BaseEntity {
  @Column({ enum: ETime })
  time!: ETime;

  @Column()
  date!: Date;

  @Column({ enum: EMachine })
  machine!: EMachine;

  @Column({ name: 'user_id' })
  userId!: boolean;
}
