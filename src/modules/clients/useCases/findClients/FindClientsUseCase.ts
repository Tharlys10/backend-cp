import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindClientsUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(
    limit: number,
    page: number,
    name?: string
  ): Promise<{ clients: Client[]; total: number }> {
    const { clients, total } = await this.clientsRepository.find(
      limit,
      page,
      name
    );

    return { clients, total };
  }
}

export { FindClientsUseCase };
