import { add, sub } from 'date-fns';
import { pgHelper } from '../database/pg-helper';

import format from 'date-fns/format';
import { bookings } from '../database';
import { Booking } from '../models/booking.model';

export class BookingRepository {
  async save(booking: Booking) {
    await pgHelper.client.query(
      'insert into bookings (id, apartment_fk, date, hour, machine) values ($1, $2, $3, $4, $5)',
      [booking.id, booking.userId, booking.date, booking.time, booking.machine],
    );
  }

  async find() {
    const bookings = await pgHelper.client.query('select * from bookings');
    console.log(bookings);

    return bookings.map(Booking.mapDb);
  }

  async findByDate(date: Date): Promise<Booking[]> {
    const bookings = await pgHelper.client.query(
      'select * from bookings b where b.date = $1',
      [format(date, 'yyyy-MM-dd')],
    );

    return bookings.map(Booking.mapDb);
  }

  async deleteById(id: string) {
    const index = bookings.findIndex((b) => b.id === id);

    if (index < 0) {
      throw new Error('Id não corresponde a nenhum apartamento cadastrado');
    }

    bookings.splice(index, 1);
  }

  async findByRangeDate(date: Date, range: number, userId: string) {
    const rangeMinus = sub(date, { days: range });
    const rangePlus = add(date, { days: range });
    const bookings = await pgHelper.client.query(
      'select * from bookings b where apartment_fk = $1 and date between $2 and $3',
      [userId, rangeMinus, rangePlus],
    );

    return bookings.map(Booking.mapDb);
  }
}
