import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { ApartmentRepository } from '../../repository/apartment.repository';

export type FilterApartment = {
  occupied?: boolean;
  resident?: string;
  apartment?: string;
};

export class ListApartmentsUseCase {
  private repository: ApartmentRepository;

  constructor() {
    this.repository = new ApartmentRepository();
  }

  public async execute(filters: FilterApartment): Promise<IHttpResponse> {
    const apartments = this.repository.listApartment(filters);

    return HttpResponse.ok(apartments);
  }
}
