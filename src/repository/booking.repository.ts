import { add, sub } from 'date-fns';
import { pgHelper } from '../database/pg-helper';

import { Between } from 'typeorm';
import { BookingsEntity } from '../database/entities/bookings.entity';
import { Booking } from '../models/booking.model';

export class BookingRepository {
  constructor(private manager = pgHelper.client.manager) {}

  async save(booking: Booking) {
    await this.manager.save(BookingsEntity, booking.toJSON());
  }

  async find() {
    const bookings = await this.manager.find(BookingsEntity);

    return bookings.map(Booking.mapDb);
  }

  async findByDate(date: Date): Promise<Booking[]> {
    const bookings = await this.manager.findBy(BookingsEntity, { date });

    // const bookings = await pgHelper.client.query(
    //   'select * from bookings b where b.date = $1',
    //   [format(date, 'yyyy-MM-dd')],
    // );

    return bookings.map(Booking.mapDb);
  }

  async deleteById(id: string) {
    const booking = await this.manager.exists(BookingsEntity, {
      where: { id },
    });

    if (!booking) {
      throw new Error('Id não corresponde a nenhum agendamento cadastrado');
    }

    await this.manager.delete(BookingsEntity, id);
  }

  async findByRangeDate(date: Date, range: number, userId: string) {
    const rangeMinus = sub(date, { days: range });
    const rangePlus = add(date, { days: range });

    const bookings = await this.manager.find(BookingsEntity, {
      where: {
        date: Between(rangeMinus, rangePlus),
        userId,
      },
    });

    // const bookings = await pgHelper.client.query(
    //   'select * from bookings b where apartment_fk = $1 and date between $2 and $3',
    //   [userId, rangeMinus, rangePlus],
    // );

    return bookings.map(Booking.mapDb);
  }
}
