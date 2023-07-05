import { Booking, CreateBookingDTO } from '../../Models/Booking.model';
import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { BookingRepository } from '../../repository/booking.repository';

export class CreateBookingUseCase {
  private repository: BookingRepository;

  constructor() {
    this.repository = new BookingRepository();
  }

  async execute(data: CreateBookingDTO): Promise<IHttpResponse> {
    const booking = new Booking(data);

    await this.repository.save(booking);

    return HttpResponse.created(booking.toJSON());
  }
}
