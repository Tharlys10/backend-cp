import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindClientsUseCase } from './FindClientsUseCase';

class FindClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    let { name, limit, page } = request.query;

    const findClientsUseCase = container.resolve(FindClientsUseCase);

    const { clients, total } = await findClientsUseCase.execute(
      !Number(limit) || Number(limit) <= 0 ? 10 : Number(limit),
      !Number(page) || Number(page) <= 0 ? 1 : Number(page),
      !name || name === '' ? undefined : String(name)
    );

    return response.json({ clients, total });
  }
}

export { FindClientsController };
