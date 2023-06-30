import { randomUUID as UUIDv4 } from 'node:crypto';
import { Booking } from './Booking.model';

export type CreateApartmentDTO = {
  number: string;
};

export class Apartment {
  #id: string;
  #number: string;
  #residentName: string;
  #bookings: Booking[];
  #password: string;
  #isOccupied: boolean;

  constructor({ number }: CreateApartmentDTO) {
    this.#id = UUIDv4();
    this.#number = number;
    this.#residentName = number;
    this.#bookings = [];
    this.#password = number;
    this.#isOccupied = false;
  }

  get number(): string {
    return this.#number;
  }

  toJSON() {
    return {
      id: this.#id,
      number: this.#number,
      residentName: this.#residentName,
      password: this.#password,
      isOccupied: this.#isOccupied,
      bookings: this.#bookings,
    };
  }
}
