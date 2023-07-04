import { Request, Response } from 'express';
import { CreateApartmentUseCase } from '../usecase/createApartment.usecase';
import { ListApartmentsUseCase } from '../usecase/listApartment.usecase';
import { UpdateApartmentUseCase } from '../usecase/updateApartment.usecase';
import { UpdateApartmentDTO } from './../Models/Apartment.model';

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

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { isOccupied, password, residentName }: UpdateApartmentDTO = req.body;

    const useCase = new UpdateApartmentUseCase();
    const { body, statusCode, success } = await useCase.execute(id, {
      isOccupied,
      password,
      residentName,
    });

    return res.status(statusCode).json({ data: body, success });
  }
}
