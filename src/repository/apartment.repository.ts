import { ApartmentEntity } from '../database/entities/apartment.entity';
import { pgHelper } from '../database/pg-helper';
import { Apartment, UpdateApartmentDTO } from '../models/apartment.model';
import { FilterApartment } from '../usecase/apartments/listApartment.usecase';

export class ApartmentRepository {
  constructor(private manager = pgHelper.client.manager) {}

  public async listAllApartments() {
    const apartments = await this.manager.find(ApartmentEntity, {
      relations: {
        bookings: true,
      },
    });

    // const apartments = await pgHelper.client.query(
    //   'select * from apartments a inner join bookings b on a.number = b.apartment_fk',
    // );
    // console.log(apartments);

    return apartments.map(Apartment.mapDb);
  }

  public async findByNumber(number: string) {
    const apartment = await this.manager.findOneBy(ApartmentEntity, { number });

    // const [apartment] = await pgHelper.client.query(
    //   'select * from apartments a where a.number = $1',
    //   [number],
    // );

    return apartment ? Apartment.mapDb(apartment) : undefined;
  }

  public async saveApartment(apartment: Apartment) {
    await this.manager.save(ApartmentEntity, apartment);
  }

  public listApartment({ apartment, occupied, resident }: FilterApartment) {
    const filters: any = {};

    if (apartment) {
      filters.number = apartment;
    }

    if (occupied !== undefined) {
      filters.isOccupied = occupied;
    }

    if (resident) {
      filters.resident = resident;
    }

    const listaFiltrada = this.manager.find(ApartmentEntity, {
      where: filters,
      relations: {
        bookings: true,
      },
    });

    return listaFiltrada;
  }

  public async updateApartment(id: string, data: UpdateApartmentDTO) {
    const apartmentDb = await this.manager.findOneBy(ApartmentEntity, { id });

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

    await this.manager.update(
      ApartmentEntity,
      id,
      apartment.toJSONWithPassword(),
    );
  }

  public async deleteApartment(id: string) {
    const apartment = await this.manager.findOneBy(ApartmentEntity, { id });

    if (!apartment) {
      throw new Error();
    }

    await this.manager.delete(ApartmentEntity, id);
  }
}
