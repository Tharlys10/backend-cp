import { CitiesRepositoryInMemory } from '@modules/cities/repositories/in-memory/CitiesRepositoryInMemory';
import { CreateCityUseCase } from './CreateCityUseCase';

let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let createCityUseCase: CreateCityUseCase;

describe('Create City', () => {
  beforeEach(() => {
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(citiesRepositoryInMemory);
  });

  it('should be able to create a new city', async () => {
    const name = 'City Wonderful';
    const state = 'State';

    const city = await createCityUseCase.execute({
      name,
      state,
    });

    expect(city).toHaveProperty('id');
    expect(city.name).toEqual(name);
  });
});
