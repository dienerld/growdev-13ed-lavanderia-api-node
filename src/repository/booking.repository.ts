import { add, differenceInDays, isAfter, isBefore, sub } from 'date-fns';

import { Booking } from '../Models/Booking.model';
import { bookings } from '../database';

export class BookingRepository {
  async save(booking: Booking) {
    bookings.push(booking);
  }

  async find() {
    return bookings;
  }

  async findByDate(date: Date): Promise<Booking[]> {
    const results = bookings.filter(
      (b) => differenceInDays(new Date(b.date), new Date(date)) === 0,
    );

    return results;
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
    const bookingsUser = bookings.filter((b) => b.userId === userId);
    const results = bookingsUser
      .filter((b) => isAfter(b.date, rangeMinus))
      .filter((b) => isBefore(b.date, rangePlus));

    return results;
  }
}
