import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { BookingRepository } from '../../repository/booking.repository';

export class ListBookingUseCase {
  private repository: BookingRepository;

  constructor() {
    this.repository = new BookingRepository();
  }

  async execute(): Promise<IHttpResponse> {
    const bookings = await this.repository.find();

    return HttpResponse.ok(bookings);
  }
}
