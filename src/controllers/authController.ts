import { Request, Response } from 'express';
import { LoginUseCase } from '../usecase/auth/login.usecase';
import { ApartmentRepository } from '../repository/apartment.repository';

export class AuthController {
  async login(req: Request, res: Response) {
    const { num_apt, password } = req.body;

    const repository = new ApartmentRepository();
    const useCase = new LoginUseCase(repository);

    const { body, statusCode, success } = await useCase.execute({
      num_apt,
      password,
    });

    return res.status(statusCode).json({ success, data: body });
  }
}
