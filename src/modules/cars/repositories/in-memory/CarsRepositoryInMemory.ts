import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async listAllCarsAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    // FUNCIONANDO SOLUÇÃO DA ROCKETSEAT
    // let availableCars = this.cars.filter(car => car.available);

    // if (!name && !brand && !category_id) return availableCars;

    // availableCars = availableCars.filter(car => {
    //   if (car.name === name) return true;
    //   if (car.brand === brand) return true;
    //   if (car.category_id === category_id) return true;

    //   return false;
    // });

    // return availableCars;

    const all = this.cars.filter(car => {
      if (
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      if (!brand && !name && !category_id) {
        if (car.available) {
          return car;
        }
      }
      return null;
    });

    return all;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findCarsIndex = this.cars.findIndex(car => car.id === id);

    this.cars[findCarsIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
