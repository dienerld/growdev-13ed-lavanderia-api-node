import { randomUUID as UUIDv4 } from 'node:crypto';
import { EMachine } from '../Enums/machine.enum';
import { ETime } from '../Enums/time.enum';

export type CreateBookingDTO = {
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

  toJSON() {
    return {
      id: this.#id,
      date: this.#date,
      time: this.#time,
      machine: this.#machine,
      userId: this.#userId,
    };
  }
}
