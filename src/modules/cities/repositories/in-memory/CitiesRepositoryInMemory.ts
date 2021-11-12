import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { City } from '@modules/cities/infra/typeorm/entities/City';
import { ICitiesRepository } from '../ICitiesRepository';

class CitiesRepositoryInMemory implements ICitiesRepository {
  private cities: City[] = [];

  async find(
    name: string,
    state: string,
    limit: number = 10,
    page: number = 1
  ): Promise<{ cities: City[]; total: number }> {
    let cities = this.cities.splice((page - 1) * limit, limit);

    if (name) {
      cities = cities.filter(
        (city) => city.name.toLowerCase().indexOf(name) > -1
      );
    }

    if (state) {
      cities = cities.filter((city) => city.state === state);
    }

    const total = this.cities.length;

    return { cities, total };
  }

  async findById(id: string): Promise<City | undefined> {
    const city = this.cities.find((city) => city.id === id);

    return city;
  }

  async findByState(state: string): Promise<City[]> {
    const cities = this.cities.filter((city) => city.state === state);

    return cities;
  }

  async create({ name, state }: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, {
      name,
      state,
    });

    this.cities.push(city);

    return city;
  }
}

export { CitiesRepositoryInMemory };
