import { CitiesRepositoryInMemory } from '@modules/cities/repositories/in-memory/CitiesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateClientUseCase } from './CreateClientUseCase';

let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let citiesRepositoryInMemory: CitiesRepositoryInMemory;
let createClientUseCase: CreateClientUseCase;

describe('Create Client', () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    citiesRepositoryInMemory = new CitiesRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(
      clientsRepositoryInMemory,
      citiesRepositoryInMemory
    );
  });

  it('should be able create new client', async () => {
    const { id: city_id } = await citiesRepositoryInMemory.create({
      name: 'San Diego',
      state: 'California',
    });

    const client = await createClientUseCase.execute({
      full_name: 'Fernanda Alícia Costa',
      gender: 'masculine',
      date_nasc: new Date('1980-01-23'),
      age: 41,
      city_id,
    });

    expect(client).toHaveProperty('id');
  });

  it('should not be able create new client if city not exists', async () => {
    const city_id = '5b5ade31-4400-4309-be97-a3583bc24234';

    await expect(
      createClientUseCase.execute({
        full_name: 'Luiz Raimundo José Caldeira',
        gender: 'masculine',
        date_nasc: new Date('2001-08-10'),
        age: 20,
        city_id,
      })
    ).rejects.toEqual(new AppError('City not found'));
  });
});
