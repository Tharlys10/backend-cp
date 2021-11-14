import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '@modules/clients/dtos/IUpdateClientDTO';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { getRepository, ILike, Repository } from 'typeorm';
import { Client } from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  async find(
    limit: number = 10,
    page: number = 1,
    name?: string
  ): Promise<{ clients: Client[]; total: number }> {
    const [clients, total] = await this.repository.findAndCount({
      where: {
        full_name: ILike(name ? `%${name}%` : '%%'),
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['city'],
      order: { full_name: 'ASC' },
    });

    return { clients, total };
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = await this.repository.findOne(id, {
      relations: ['city'],
    });

    return client;
  }

  async create({
    full_name,
    gender,
    date_nasc,
    age,
    city_id,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.repository.create({
      full_name,
      gender,
      date_nasc,
      age,
      city_id,
    });

    await this.repository.save(client);

    return client;
  }

  async update(id: string, { full_name }: IUpdateClientDTO): Promise<Client> {
    const client = this.repository.create({
      id,
      full_name,
    });

    await this.repository.save(client);

    return client;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ClientsRepository };
