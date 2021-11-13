import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '@modules/clients/dtos/IUpdateClientDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '../IClientsRepository';

class ClientsRepositoryInMemory implements IClientsRepository {
  private clients: Client[] = [];

  async find(
    limit: number,
    page: number,
    name?: string
  ): Promise<{ clients: Client[]; total: number }> {
    const total = this.clients.length;

    let clients = this.clients;

    if (name) {
      clients = clients.filter(
        (client) =>
          client.full_name.toLowerCase().indexOf(name.toLowerCase()) > -1
      );
    }

    clients = clients.splice((page - 1) * limit, limit);

    return { clients, total };
  }

  async findById(id: string): Promise<Client | undefined> {
    const client = this.clients.find((client) => client.id === id);

    return client;
  }

  async create({
    full_name,
    gender,
    date_nasc,
    age,
    city_id,
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, {
      full_name,
      gender,
      date_nasc,
      age,
      city_id,
    });

    this.clients.push(client);

    return client;
  }

  async update(id: string, { full_name }: IUpdateClientDTO): Promise<Client> {
    const index = this.clients.findIndex((client) => client.id === id);

    this.clients[index].full_name = full_name;

    return this.clients[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.clients.findIndex((client) => client.id === id);

    this.clients.splice(index, 1);
  }
}

export { ClientsRepositoryInMemory };
