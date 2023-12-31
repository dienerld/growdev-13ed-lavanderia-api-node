import { randomUUID as UUIDv4 } from 'crypto';
import { BookingsEntity } from '../database/entities/bookings.entity';
import { EMachine } from '../enums/machine.enum';
import { ETime } from '../enums/time.enum';

export type CreateBookingDTO = {
  date: Date;
  time: ETime;
  machine: EMachine;
  userId: string;
};

export type OutputBooking = {
  id: string;
  date: Date;
  time: ETime;
  machine: EMachine;
  userId: string;
};

export class Booking {
  #id: string;
  #date: Date;
  #time: ETime;
  #machine: EMachine;
  #userId: string;

  constructor({ date, time, machine, userId }: CreateBookingDTO) {
    this.#id = UUIDv4();
    this.#date = date;
    this.#time = time;
    this.#machine = machine;
    this.#userId = userId;
  }

  static mapDb(data: BookingsEntity) {
    const booking = new Booking(data);

    booking.#id = data.id;
    booking.#date = data.date;
    // @ts-expect-error
    booking.#time = ETime[data.time];
    // @ts-expect-error
    booking.#machine = EMachine[data.machine];
    booking.#userId = data.userId;

    return booking;
  }

  get date(): Date {
    return this.#date;
  }

  get time(): ETime {
    return this.#time;
  }

  get machine(): EMachine {
    return this.#machine;
  }

  get id(): string {
    return this.#id;
  }

  get userId(): string {
    return this.#userId;
  }

  toJSON(): OutputBooking {
    return {
      id: this.#id,
      date: this.#date,
      time: this.#time,
      machine: this.#machine,
      userId: this.#userId,
    };
  }
}
