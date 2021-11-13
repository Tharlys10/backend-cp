import { CitiesRepository } from '@modules/cities/infra/typeorm/repositories/CitiesRepository';
import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository
);
