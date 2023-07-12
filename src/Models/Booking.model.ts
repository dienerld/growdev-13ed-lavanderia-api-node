import { randomUUID as UUIDv4 } from 'crypto';
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
