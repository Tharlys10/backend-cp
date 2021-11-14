import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO';
import { Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  find(
    limit: number,
    page: number,
    name?: string
  ): Promise<{ clients: Client[]; total: number }>;
  findById(id: string): Promise<Client | undefined>;
  create(data: ICreateClientDTO): Promise<Client>;
  update(id: string, data: IUpdateClientDTO): Promise<Client>;
  delete(id: string): Promise<void>;
}

export { IClientsRepository };
