import { ICreateCityDTO } from '@modules/cities/dtos/ICreateCityDTO';
import { City } from '@modules/cities/infra/typeorm/entities/City';
import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCityUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  async execute({ name, state }: ICreateCityDTO): Promise<City> {
    const limit = 1;
    const page = 1;

    const { cities: city_exists_in_state } = await this.citiesRepository.find(
      limit,
      page,
      name,
      state
    );

    if (city_exists_in_state.length) {
      throw new AppError('City already exists in this state');
    }

    const city = await this.citiesRepository.create({ name, state });

    return city;
  }
}

export { CreateCityUseCase };
