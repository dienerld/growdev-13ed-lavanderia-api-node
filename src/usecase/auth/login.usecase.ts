import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { ApartmentRepository } from '../../repository/apartment.repository';

type TDataLogin = {
  num_apt: string;
  password: string;
};

export class LoginUseCase {
  constructor(private repository: ApartmentRepository) {}

  async execute(data: TDataLogin): Promise<IHttpResponse> {
    const apartment = await this.repository.findByNumber(data.num_apt);

    if (!apartment) {
      return HttpResponse.badRequest(new Error('Login inválido'));
    }

    if (apartment.password !== data.password) {
      return HttpResponse.badRequest(new Error('Login inválido'));
    }

    return HttpResponse.ok(apartment.toJSON());
  }
}
