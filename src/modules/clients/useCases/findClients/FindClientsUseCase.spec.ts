import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';
import { FindClientsUseCase } from './FindClientsUseCase';

let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let findClientsUseCase: FindClientsUseCase;

describe('Find Clients', () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    findClientsUseCase = new FindClientsUseCase(clientsRepositoryInMemory);
  });

  it('should be able list clients', async () => {
    await clientsRepositoryInMemory.create({
      full_name: 'Kaique Geraldo Dias',
      gender: 'masculine',
      date_nasc: new Date('2010-01-20'),
      age: 11,
      city_id: '16488192-8a47-4c2b-821a-06b16019ee8b',
    });

    await clientsRepositoryInMemory.create({
      full_name: 'Ricardo Yago da Silva',
      gender: 'masculine',
      date_nasc: new Date('2000-11-10'),
      age: 21,
      city_id: '16488192-8a47-4c2b-821a-06b16019ee8b',
    });

    const { clients, total } = await findClientsUseCase.execute(
      10,
      1,
      undefined
    );

    expect(total).toBe(2);
    expect(clients.length).toBe(2);
  });

  it('should be able search client by name', async () => {
    const full_name = 'Erick Danilo Hugo Moraes';

    await clientsRepositoryInMemory.create({
      full_name,
      gender: 'masculine',
      date_nasc: new Date('2015-08-20'),
      age: 6,
      city_id: '16488192-8a47-4c2b-821a-06b16019ee8b',
    });

    const { clients } = await findClientsUseCase.execute(10, 1, full_name);

    expect(clients[0].full_name).toBe(full_name);
  });
});
