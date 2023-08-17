import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { ApartmentRepository } from '../../repository/apartment.repository';

export type FilterApartment = {
  occupied?: boolean;
  resident?: string;
  apartment?: string;
};

export class ListAllApartmentsUseCase {
  private repository: ApartmentRepository;

  constructor() {
    this.repository = new ApartmentRepository();
  }

  public async execute(): Promise<IHttpResponse> {
    const apartments = await this.repository.listAllApartments();

    return HttpResponse.ok(apartments);
  }
}
