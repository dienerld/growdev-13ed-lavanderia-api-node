import { Request, Response } from 'express';
import { CreateApartmentUseCase } from '../usecase/createApartment.usecase';

export class ApartmentController {
  public async create(req: Request, res: Response) {
    const { number } = req.body;

    const useCase = new CreateApartmentUseCase();
    const response = await useCase.execute({
      number,
    });

    return res.json(response);
  }
}
