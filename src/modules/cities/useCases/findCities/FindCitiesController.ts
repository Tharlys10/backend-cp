import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindCitiesUseCase } from './FindCitiesUseCase';

class FindCitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    let { name, state, limit, page } = request.query;

    const findCitiesUseCase = container.resolve(FindCitiesUseCase);

    const { cities, total } = await findCitiesUseCase.execute(
      !Number(limit) || Number(limit) <= 0 ? 10 : Number(limit),
      !Number(page) || Number(page) <= 0 ? 1 : Number(page),
      !name || name === '' ? undefined : String(name),
      !state || state === '' ? undefined : String(state)
    );

    return response.json({ cities, total });
  }
}

export { FindCitiesController };
