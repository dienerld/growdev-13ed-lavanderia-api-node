import { randomUUID as UUIDv4 } from 'node:crypto';
import { Booking } from './Booking.model';

type CreateApartmentDTO = {
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
}
