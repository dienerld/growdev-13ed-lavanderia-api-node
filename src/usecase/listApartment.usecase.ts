import { HttpResponse, IHttpResponse } from '../helpers/httpResponse';
import { ApartmentRepository } from '../repository/apartment.repository';

export class ListApartmentsUseCase {
  private repository: ApartmentRepository;

  constructor() {
    this.repository = new ApartmentRepository();
  }

  public async execute(): Promise<IHttpResponse> {
    const apartments = this.repository.listApartment();

    return HttpResponse.ok(apartments);
  }
}
