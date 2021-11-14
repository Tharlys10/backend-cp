import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { DeleteClientUseCase } from './DeleteClientUseCase';

let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let deleteClientUseCase: DeleteClientUseCase;

describe('Delete Client', () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    deleteClientUseCase = new DeleteClientUseCase(clientsRepositoryInMemory);
  });

  it('should be able delete client', async () => {
    const clint_create = await clientsRepositoryInMemory.create({
      full_name: 'Carla Sarah Rodrigues',
      gender: 'masculine',
      date_nasc: new Date('2010-11-20'),
      age: 11,
      city_id: '16488192-8a47-4c2b-821a-06b16019ee8b',
    });

    const { id } = clint_create;

    await deleteClientUseCase.execute(id);

    const client_already_exist_check = await clientsRepositoryInMemory.findById(
      id
    );

    expect(client_already_exist_check).toBeUndefined();
  });

  it('should not be able delete client not found', async () => {
    const id = '853af9bd-d247-4133-85dd-f9091a79eeb9';

    await expect(deleteClientUseCase.execute(id)).rejects.toEqual(
      new AppError('Client not found', 404)
    );
  });
});
