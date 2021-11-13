import { CitiesRepositoryInMemory } from '@modules/cities/repositories/in-memory/CitiesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';
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
    const client = await createClientUseCase.execute({
      full_name: 'Fernanda Alícia Costa',
      gender: 'masculine',
      date_nasc: new Date('1980-01-23'),
      age: 41,
      city_id: '5b5ade31-4400-4309-be97-a3583bc24234',
    });

    expect(client).toHaveProperty('id');
  });
});
