import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';
import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { full_name } = request.body;
    const { id } = request.params;

    try {
      const schema = yup.object().shape({
        full_name: yup.string().required(),
      });

      await schema.validate(request.body);
    } catch (error: any) {
      throw new AppError(error.message, 422);
    }

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const client = await updateClientUseCase.execute(id, { full_name });

    return response.json(client);
  }
}

export { UpdateClientController };
