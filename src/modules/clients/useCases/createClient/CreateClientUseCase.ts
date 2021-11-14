import { ICitiesRepository } from '@modules/cities/repositories/ICitiesRepository';
import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  async execute({
    full_name,
    gender,
    date_nasc,
    age,
    city_id,
  }: ICreateClientDTO): Promise<Client> {
    const city_already_exist = await this.citiesRepository.findById(city_id);

    if (!city_already_exist) {
      throw new AppError('City not found', 404);
    }

    const client = await this.clientsRepository.create({
      full_name,
      gender,
      date_nasc,
      age,
      city_id,
    });

    return client;
  }
}

export { CreateClientUseCase };
