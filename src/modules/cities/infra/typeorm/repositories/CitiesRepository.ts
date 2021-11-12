import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { getRepository, Repository } from 'typeorm';
import { City } from '../entities/City';

class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = getRepository(City);
  }

  async find(
    limit: number = 10,
    page: number = 1,
    name?: string,
    state?: string
  ): Promise<{ cities: City[]; total: number }> {
    const cities_query = this.repository
      .createQueryBuilder('cities')
      .skip((page - 1) * limit)
      .take(limit);

    if (name) {
      cities_query.where('name ILIKE :name', { name: `%${name}%` });
    }

    if (state) {
      cities_query.where('state = :state', { state });
    }

    const [cities, total] = await cities_query.getManyAndCount();

    return { cities, total };
  }

  async findById(id: string): Promise<City | undefined> {
    const city = await this.repository.findOne(id);

    return city;
  }

  async findByState(state: string): Promise<City[]> {
    const cities = await this.repository.find({
      where: {
        state,
      },
    });

    return cities;
  }

  async create({ name, state }: ICreateCityDTO): Promise<City> {
    const city = this.repository.create({
      name,
      state,
    });

    await this.repository.save(city);

    return city;
  }
}

export { CitiesRepository };
