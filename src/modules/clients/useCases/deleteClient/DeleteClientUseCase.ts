import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const client_already_exist = await this.clientsRepository.findById(id);

    if (!client_already_exist) {
      throw new AppError('Client not found', 404);
    }

    await this.clientsRepository.delete(id);
  }
}

export { DeleteClientUseCase };
