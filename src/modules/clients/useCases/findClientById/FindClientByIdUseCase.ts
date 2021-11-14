import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindClientByIdUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<Client> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found');
    }

    return client;
  }
}

export { FindClientByIdUseCase };
