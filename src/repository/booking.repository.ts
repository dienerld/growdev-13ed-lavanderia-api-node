import { Booking } from '../Models/Booking.model';
import { bookings } from '../database';

export class BookingRepository {
  async save(booking: Booking) {
    bookings.push(booking);
  }
}
