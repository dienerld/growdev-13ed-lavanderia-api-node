import { Request, Response } from "express";
import { CreateApartmentUseCase } from "../usecase/createApatment.usecase";


export class ApartamentController {

    public async create(req: Request, res: Response) {
        const {number} = req.body;
        
        const useCase = new CreateApartmentUseCase();
        const response = await useCase.execute({
            number
        })

        return res.json(response);
    }
}