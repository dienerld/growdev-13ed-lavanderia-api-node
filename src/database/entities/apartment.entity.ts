import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BookingsEntity } from './bookings.entity';

@Entity({ name: 'apartments' })
export class ApartmentEntity extends BaseEntity {
  @Column()
  number!: string;

  @Column({ name: 'name_resident' })
  residentName!: string;

  @OneToMany(() => BookingsEntity, (booking) => booking.apartment)
  bookings!: BookingsEntity[];

  @Column()
  password!: string;

  @Column({ name: 'is_occupied' })
  isOccupied!: boolean;
}
