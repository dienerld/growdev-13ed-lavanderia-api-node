import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { Apartment, CreateApartmentDTO } from '../../models/apartment.model';
import { ApartmentRepository } from '../../repository/apartment.repository';

export class CreateApartmentUseCase {
  private repository: ApartmentRepository;

  constructor() {
    this.repository = new ApartmentRepository();
  }

  public async execute(data: CreateApartmentDTO): Promise<IHttpResponse> {
    const apartmentAlreadyExists = await this.repository.findByNumber(
      data.number,
    );

    if (apartmentAlreadyExists) {
      return HttpResponse.badRequest(new Error('Apartamento já existente'));
    }
    const ap = new Apartment(data);

    this.repository.saveApartment(ap);

    return HttpResponse.created(ap.toJSON());
  }
}
