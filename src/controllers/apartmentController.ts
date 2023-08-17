import { Request, Response } from 'express';
import { UpdateApartmentDTO } from '../models/apartment.model';
import { CreateApartmentUseCase } from '../usecase/apartments/createApartment.usecase';
import { ListAllApartmentsUseCase } from '../usecase/apartments/listAllApartments';
import {
  FilterApartment,
  ListApartmentsUseCase,
} from '../usecase/apartments/listApartment.usecase';
import { UpdateApartmentUseCase } from '../usecase/apartments/updateApartment.usecase';

export class ApartmentController {
  public async create(req: Request, res: Response) {
    const { number } = req.body;

    const useCase = new CreateApartmentUseCase();
    const { body, statusCode, success } = await useCase.execute({
      number,
    });

    return res.status(statusCode).json({ data: body, success });
  }

  public async listAll(req: Request, res: Response) {
    const useCase = new ListAllApartmentsUseCase();

    const { body, statusCode, success } = await useCase.execute();

    return res.status(statusCode).json({ data: body, success });
  }

  public async list(req: Request, res: Response) {
    const useCase = new ListApartmentsUseCase();
    const { occupied, resident, apartment }: FilterApartment = req.query;

    const { body, statusCode, success } = await useCase.execute({
      occupied,
      resident,
      apartment,
    });

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
