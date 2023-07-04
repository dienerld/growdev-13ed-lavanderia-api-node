import { Request, Response } from 'express';
import { CreateApartmentUseCase } from '../usecase/createApartment.usecase';
import { ListApartmentsUseCase } from '../usecase/listApartment.usecase';

export class ApartmentController {
  public async create(req: Request, res: Response) {
    const { number } = req.body;

    const useCase = new CreateApartmentUseCase();
    const { body, statusCode, success } = await useCase.execute({
      number,
    });

    return res.status(statusCode).json({ data: body, success });
  }

  public async listar(req: Request, res: Response) {
    const useCase = new ListApartmentsUseCase();
    const { body, statusCode, success } = await useCase.execute();

    return res.status(statusCode).json({ data: body, success });
  }
}
