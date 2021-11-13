import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { full_name, gender, date_nasc, age, city_id } = request.body;

    try {
      const schema = yup.object().shape({
        full_name: yup.string().required(),
        gender: yup.string().required(),
        date_nasc: yup.date().required(),
        age: yup.number().required().min(0),
        city_id: yup.string().uuid().required(),
      });

      await schema.validate(request.body);
    } catch (error: any) {
      throw new AppError(error.message, 422);
    }

    if (gender != 'masculine' && gender != 'feminine') {
      throw new AppError('gender not supported (masculine or feminine)', 422);
    }

    if (date_nasc.length != 10) {
      throw new AppError('format birth date incorrect', 422);
    }

    if (new Date(date_nasc) > new Date()) {
      throw new AppError('date of birth greater than today date', 422);
    }

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const client = await createClientUseCase.execute({
      full_name,
      gender,
      date_nasc: new Date(date_nasc),
      age,
      city_id,
    });

    return response.status(201).json(client);
  }
}

export { CreateClientController };
