import { HttpResponse } from "../../helpers/httpResponse";
import { BookingRepository } from "../../repository/booking.repository";

export class DeleteBookingUseCase {
  private repository: BookingRepository;

  constructor() {
    this.repository = new BookingRepository();
  }

  async execute(id: string) {
    try {
      await this.repository.deleteById(id);
      return HttpResponse.ok("Agendamento excluído com sucesso");
    } catch (err: any) {
      return HttpResponse.badRequest(err);
    }
  }
}
