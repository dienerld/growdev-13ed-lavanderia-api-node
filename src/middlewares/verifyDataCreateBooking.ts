import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { EMachine } from '../enums/machine.enum';
import { ETime } from '../enums/time.enum';
import { HttpResponse } from '../helpers/httpResponse';

const schema = z.object({
  machine: z.nativeEnum(EMachine, { description: 'Maquina inválida' }),
  time: z.nativeEnum(ETime, { description: 'Tempo indisponível' }),
  date: z.coerce.date(),
  userId: z.string(),
});

export function verifyDataCreateBooking(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { date, machine, time, userId } = req.body;

  const safeBooking = schema.safeParse({ date, machine, time, userId });

  if (!safeBooking.success) {
    const response = HttpResponse.badRequest(safeBooking.error);

    return res.status(response.statusCode).json(response.body);
  }

  req.body = safeBooking.data;

  next();
}
