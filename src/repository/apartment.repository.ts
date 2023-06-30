import { apartments } from '../database';

export class ApartmentRepository {
  public findByNumber(number: string) {
    return apartments.find((ap) => ap.number === number);
  }
}
