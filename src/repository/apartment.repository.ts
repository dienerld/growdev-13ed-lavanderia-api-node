import { apartments } from '../database';
import { pgHelper } from '../database/pg-helper';
import { Apartment, UpdateApartmentDTO } from '../models/apartment.model';
import { FilterApartment } from '../usecase/apartments/listApartment.usecase';

export class ApartmentRepository {
  public async listAllApartments() {
    const apartments = await pgHelper.client.query(
      'select * from apartments a inner join bookings b on a.number = b.apartment_fk',
    );
    console.log(apartments);

    return apartments.map(Apartment.mapDb);
  }

  public async findByNumber(number: string) {
    const [apartment] = await pgHelper.client.query(
      'select * from apartments a where a.number = $1',
      [number],
    );

    return apartment ? Apartment.mapDb(apartment) : undefined;
  }

  public async saveApartment(apartment: Apartment) {
    await pgHelper.client.query(
      'insert into apartments(id, is_occupied,number, name_resident,password) values ($1, $2, $3, $4, $5) ',
      [
        apartment.id,
        apartment.isOccupied,
        apartment.number,
        apartment.residentName,
        apartment.password,
      ],
    );
  }

  public listApartment({ apartment, occupied, resident }: FilterApartment) {
    let listFiltered = apartments;

    if (apartment) {
      listFiltered = listFiltered.filter((ap) => ap.number.includes(apartment));
    }

    if (occupied !== undefined) {
      console.log('occupied', Boolean(occupied), typeof occupied);
      // @ts-expect-error
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

  public async updateApartment(id: string, data: UpdateApartmentDTO) {
    const [apartmentDb] = await pgHelper.client.query(
      'select * from apartments a where a.id = $1 ',
      [id],
    );

    if (!apartmentDb) {
      throw new Error('Apartamento não encontrado.');
    }

    const apartment = Apartment.mapDb(apartmentDb);

    if (data.residentName) {
      apartment.residentName = data.residentName;
    }

    if (data.password) {
      apartment.password = data.password;
    }

    if (data.isOccupied !== undefined) {
      apartment.isOccupied = data.isOccupied;
    }

    await pgHelper.client.query(
      'update apartments set name_resident = $1, password = $2, is_occupied = $3 where id = $4',
      [
        apartment.residentName,
        apartment.password,
        apartment.isOccupied,
        apartment.id,
      ],
    );
  }

  public async deleteApartment(id: string) {
    const [apartment] = await pgHelper.client.query(
      'select * from apartments a where a.id = $1',
      [id],
    );

    if (!apartment) {
      throw new Error();
    }

    await pgHelper.client.query('delete from apartments where id = $1 ', [id]);
  }
}
