import { Apartment } from '../models/apartment.model';
import { Booking } from '../models/booking.model';

export const apartments: Apartment[] = [new Apartment({ number: '123' })];

export const bookings: Booking[] = [];

apartments[0].toggleOccupied();
