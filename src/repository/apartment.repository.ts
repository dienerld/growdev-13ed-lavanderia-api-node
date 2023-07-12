import { Apartment, UpdateApartmentDTO } from '../Models/Apartment.model';
import { apartments } from '../database';
import { FilterApartment } from '../usecase/Apartments/listApartment.usecase';

export class ApartmentRepository {
  public findByNumber(number: string) {
    return apartments.find((ap) => ap.number === number);
  }

  public saveApartment(apartment: Apartment) {
    apartments.push(apartment);
  }

  public listApartment({ apartment, occupied, resident }: FilterApartment) {
    let listFiltered = apartments;

    if (apartment) {
      listFiltered = listFiltered.filter((ap) => ap.number.includes(apartment));
    }

    if (occupied !== undefined) {
      console.log('occupied', Boolean(occupied), typeof occupied);
      occupied = occupied === 'true';
      listFiltered = listFiltered.filter((ap) => ap.isOccupied === occupied);
    }

    if (resident) {
      listFiltered = listFiltered.filter((ap) =>
        ap.residentName.includes(resident),
      );
    }

    return listFiltered;
  }

  public updateApartment(id: string, data: UpdateApartmentDTO) {
    const indexApartment = apartments.findIndex((apartment) => {
      return apartment.id === id;
    });

    if (indexApartment === -1) {
      throw new Error('Apartamento não encontrado.');
    }

    if (data.residentName) {
      apartments[indexApartment].residentName = data.residentName;
    }

    if (data.password) {
      apartments[indexApartment].password = data.password;
    }

    if (data.isOccupied !== undefined) {
      apartments[indexApartment].isOccupied = data.isOccupied;
    }
  }
}
