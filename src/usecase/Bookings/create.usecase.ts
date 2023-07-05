import { Booking, CreateBookingDTO } from '../../Models/Booking.model';
import { HttpResponse, IHttpResponse } from '../../helpers/httpResponse';
import { BookingRepository } from '../../repository/booking.repository';

export class CreateBookingUseCase {
  private repository: BookingRepository;

  constructor() {
    this.repository = new BookingRepository();
  }

  async execute(data: CreateBookingDTO): Promise<IHttpResponse> {
    const bookingsDate = await this.repository.findByDate(data.date);

    const bookingsTime = bookingsDate.filter((b) => b.time === data.time);

    const alreadyBooked = bookingsTime.some((b) => b.machine === data.machine);

    if (alreadyBooked) {
      return HttpResponse.badRequest(
        new Error('Este horário já foi reservado'),
      );
    }

    const booking = new Booking(data);
    await this.repository.save(booking);

    return HttpResponse.created(booking.toJSON());
  }
}
