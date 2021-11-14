import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { FindClientByIdUseCase } from './FindClientByIdUseCase';

let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let findClientByIdUseCase: FindClientByIdUseCase;

describe('Find Client By ID', () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    findClientByIdUseCase = new FindClientByIdUseCase(
      clientsRepositoryInMemory
    );
  });

  it('should be able search client by id', async () => {
    const clint_create = await clientsRepositoryInMemory.create({
      full_name: 'Benjamin Vicente da Paz',
      gender: 'masculine',
      date_nasc: new Date('2010-01-20'),
      age: 11,
      city_id: '16488192-8a47-4c2b-821a-06b16019ee8b',
    });

    const { id } = clint_create;

    const client = await findClientByIdUseCase.execute(id);

    expect(client).toEqual(clint_create);
  });

  it('should not be able search client by id not found', async () => {
    const id = '853af9bd-d247-4133-85dd-f9091a79eeb9';

    await expect(findClientByIdUseCase.execute(id)).rejects.toEqual(
      new AppError('Client not found', 404)
    );
  });
});
