import { IUpdateClientDTO } from '@modules/clients/dtos/IUpdateClientDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string, { full_name }: IUpdateClientDTO): Promise<Client> {
    const client_already_exist = await this.clientsRepository.findById(id);

    if (!client_already_exist) {
      throw new AppError('Client not found', 404);
    }

    const client = await this.clientsRepository.update(id, { full_name });

    return client;
  }
}

export { UpdateClientUseCase };
