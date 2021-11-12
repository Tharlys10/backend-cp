import { City } from '@modules/cities/infra/typeorm/entities/City';
import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { inject } from 'tsyringe';

class FindCitiesUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  async execute(
    limit: number,
    page: number,
    name?: string,
    state?: string
  ): Promise<{ cities: City[]; total: number }> {
    const { cities, total } = await this.citiesRepository.find(
      limit,
      page,
      name,
      state
    );

    return { cities, total };
  }
}

export { FindCitiesUseCase };
