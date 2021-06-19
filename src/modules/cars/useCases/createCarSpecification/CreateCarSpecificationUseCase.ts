import { injectable, inject } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private specificationsRespository: ISpecificationsRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExits = await this.carsRepository.findById(car_id);

    if (!carExits) {
      throw new AppError('Car does not exists', 404);
    }

    const specifications = await this.specificationsRespository.findByIds(
      specifications_id,
    );

    carExits.specifications = specifications;

    await this.carsRepository.create(carExits);

    return carExits;
  }
}

export { CreateCarSpecificationUseCase };
