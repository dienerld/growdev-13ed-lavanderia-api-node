import { Request, Response } from 'express';
import { CreateBookingDTO } from '../Models/Booking.model';
import { CreateBookingUseCase } from '../usecase/Bookings/create.usecase';

export class BookingController {
  async create(req: Request, res: Response) {
    const { date, machine, time, userId }: CreateBookingDTO = req.body;

    const usecase = new CreateBookingUseCase();
    const { body, statusCode, success } = await usecase.execute({
      date,
      machine,
      time,
      userId,
    });

    return res.status(statusCode).json({
      data: body,
      success,
    });
  }
}
