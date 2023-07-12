import { randomUUID as UUIDv4 } from 'node:crypto';
import { Booking } from './Booking.model';

export type CreateApartmentDTO = {
  number: string;
};

export type UpdateApartmentDTO = {
  password?: string;
  residentName?: string;
  isOccupied?: boolean;
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

  get id(): string {
    return this.#id;
  }

  get isOccupied(): boolean {
    return this.#isOccupied;
  }

  get residentName(): string {
    return this.#residentName;
  }

  set password(password: string) {
    this.#password = password;
  }

  set residentName(residentName: string) {
    this.#residentName = residentName;
  }

  set isOccupied(isOccupied: boolean) {
    this.#isOccupied = isOccupied;
  }

  toggleOccupied() {
    this.#isOccupied = !this.#isOccupied;
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
