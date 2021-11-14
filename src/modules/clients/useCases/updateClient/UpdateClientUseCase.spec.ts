import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { UpdateClientUseCase } from './UpdateClientUseCase';

let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let updateClientUseCase: UpdateClientUseCase;

describe('Update Client', () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    updateClientUseCase = new UpdateClientUseCase(clientsRepositoryInMemory);
  });

  it('should be able update client', async () => {
    const clint_create = await clientsRepositoryInMemory.create({
      full_name: 'Renan Tiago Eduardo da Conceição',
      gender: 'masculine',
      date_nasc: new Date('2008-11-20'),
      age: 13,
      city_id: '16488192-8a47-4c2b-821a-06b16019ee8b',
    });

    const { id } = clint_create;
    const name_update = 'Renan Tiago Eduardo da Silva';

    const client = await updateClientUseCase.execute(id, {
      full_name: name_update,
    });

    expect(client.full_name).toEqual(name_update);
  });

  it('should not be able update if client not found', async () => {
    const id = '16488192-8a47-4c2b-821a-06b16019ee8b';
    const name_update = 'Nina Alice Rezende';

    await expect(
      updateClientUseCase.execute(id, {
        full_name: name_update,
      })
    ).rejects.toEqual(new AppError('Client not found', 404));
  });
});
