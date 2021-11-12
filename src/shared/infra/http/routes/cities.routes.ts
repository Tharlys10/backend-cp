import { CreateCityController } from '@modules/cities/useCases/createCity/CreateCityController';
import { Router } from 'express';

const citiesRouter = Router();

citiesRouter.post('/', new CreateCityController().handle);

export { citiesRouter };
