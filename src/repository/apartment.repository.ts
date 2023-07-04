import { Apartment } from '../Models/Apartment.model';
import { apartments } from '../database';

export class ApartmentRepository {
  public findByNumber(number: string) {
    return apartments.find((ap) => ap.number === number);
  }

  public saveApartment(apartment: Apartment) {
    apartments.push(apartment);
  }
}
