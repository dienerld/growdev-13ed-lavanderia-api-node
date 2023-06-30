import { Apartment, CreateApartmentDTO } from "../Models/Apartment.model";
import { apartments } from "../database";
import { ApartmentRepository } from "../repository/apartment.repository";

type ResponseCreateApartment = {
    success: boolean;
    message: string;
    data?: any;
}

export class CreateApartmentUseCase {
    private repository: ApartmentRepository

    constructor() {
        this.repository = new ApartmentRepository()
    }
    

    public async execute(data: CreateApartmentDTO): Promise<ResponseCreateApartment> {

        const apartmentAlreadyExists = this.repository.findByNumber(data.number)

        if(apartmentAlreadyExists) {
            return {
                success: false,
                message: 'O apartamento já está cadastrado.'
            }
        }
        
        const ap = new Apartment(data)

        apartments.push(ap)

        return {
            success: true,
            message: 'Apartamento cadastrado com sucesso.',
            data: ap.toJSON()
        }
    }

    
}