import { NextFunction, Request, Response } from 'express';

export function verifyDataCreateApartment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { number } = req.body;

  if (!number) {
    return res.status(400).send({
      success: false,
      message: 'Informe um número para criar o apartamento',
    });
  }

  next();
}
