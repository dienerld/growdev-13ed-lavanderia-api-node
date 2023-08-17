import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HttpResponse } from '../helpers/httpResponse';

const schema = z.string().uuid();

export function verifyIsUuid(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  const safeId = schema.safeParse(id);

  if (!safeId.success) {
    const response = HttpResponse.badRequest(safeId.error);

    return res.status(response.statusCode).json(response.body);
  }

  next();
}
