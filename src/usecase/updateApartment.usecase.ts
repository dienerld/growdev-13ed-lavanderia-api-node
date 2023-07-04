import { UpdateApartmentDTO } from '../Models/Apartment.model';
import { HttpResponse, IHttpResponse } from '../helpers/httpResponse';
import { ApartmentRepository } from '../repository/apartment.repository';

export class UpdateApartmentUseCase {
  private repository: ApartmentRepository;

  constructor() {
    this.repository = new ApartmentRepository();
  }

  async execute(id: string, data: UpdateApartmentDTO): Promise<IHttpResponse> {
    try {
      this.repository.updateApartment(id, data);
      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
