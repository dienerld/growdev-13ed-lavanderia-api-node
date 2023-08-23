import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'apartments' })
export class ApartmentEntity extends BaseEntity {
  @Column()
  number!: string;

  @Column({ name: 'name_resident' })
  residentName!: string;

  //  @Column()
  //   bookings!: [];

  @Column()
  password!: string;

  @Column({ name: 'is_occupied' })
  isOccupied!: boolean;
}
