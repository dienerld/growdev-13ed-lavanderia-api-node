import { Request, Response } from 'express';
import { CreateBookingDTO } from '../models/booking.model';
import { CreateBookingUseCase } from '../usecase/bookings/create.usecase';
import { DeleteBookingUseCase } from '../usecase/bookings/delete.usecase';
import { ListBookingUseCase } from '../usecase/bookings/list.usecase';

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

  async list(req: Request, res: Response) {
    const usecase = new ListBookingUseCase();
    const { body, statusCode, success } = await usecase.execute();

    return res.status(statusCode).json({
      data: body,
      success,
    });
  }

  async delete(req: Request, res: Response) {
    const usecase = new DeleteBookingUseCase();

    const { body, statusCode, success } = await usecase.execute(req.params.id);

    return res.status(statusCode).json({
      data: body,
      success,
    });
  }
}
