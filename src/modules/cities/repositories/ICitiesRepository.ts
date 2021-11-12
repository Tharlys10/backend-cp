import { ICreateCityDTO } from '../dtos/ICreateCityDTO';
import { City } from '../infra/typeorm/entities/City';

interface ICitiesRepository {
  find(
    name: string,
    state: string,
    limit: number,
    page: number
  ): Promise<{ cities: City[]; total: number }>;
  findById(id: string): Promise<City | undefined>;
  findByState(state: string): Promise<City[]>;
  create(data: ICreateCityDTO): Promise<City>;
}

export { ICitiesRepository };
