import { Apartment } from '../Models/Apartment.model';
import { Booking } from '../Models/Booking.model';

export const apartments: Apartment[] = [new Apartment({ number: '123' })];

export const bookings: Booking[] = [];

apartments[0].toggleOccupied();
