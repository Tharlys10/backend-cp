import { CitiesRepositoryInMemory } from '@modules/cities/repositories/in-memory/CitiesRepositoryInMemory';
import { FindCitiesUseCase } from './FindCitiesUseCase';

let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let findCitiesUseCase: FindCitiesUseCase;

describe('Find Cities', () => {
  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    findCitiesUseCase = new FindCitiesUseCase(citiesRepositoryInMemory);
  });

  it('should be able list the cities', async () => {
    await citiesRepositoryInMemory.create({
      name: 'Atlanta',
      state: 'Georgia',
    });

    await citiesRepositoryInMemory.create({
      name: 'Miami',
      state: 'Florida',
    });

    await citiesRepositoryInMemory.create({
      name: 'San Francisco',
      state: 'California',
    });

    const name = undefined;
    const state = undefined;
    const limit = 2;
    const page = 1;

    const { cities, total } = await findCitiesUseCase.execute(
      limit,
      page,
      name,
      state
    );

    expect(total).toBe(3);
    expect(cities.length).toBe(2);
  });
});
