import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import { CreateCityUseCase } from './CreateCityUseCase';

class CreateCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state } = request.body;

    try {
      const schema = yup.object().shape({
        name: yup.string().required(),
        state: yup.string().required(),
      });

      await schema.validate(request.body);
    } catch (error: any) {
      throw new AppError(error.message, 422);
    }

    const createCityUseCase = container.resolve(CreateCityUseCase);

    const city = await createCityUseCase.execute({ name, state });

    return response.status(201).json(city);
  }
}

export { CreateCityController };
