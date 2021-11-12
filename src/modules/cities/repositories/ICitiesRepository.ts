import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  find(name: string, state: string, limit: number, page: number): Promise<City>;
  findById(id: string): Promise<City>;
  findByState(state: string): Promise<City[]>;
  create(data: ICreateCityDTO): Promise<City>;
}

export { ICitiesRepository };
