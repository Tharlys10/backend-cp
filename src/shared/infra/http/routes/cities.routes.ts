import { CreateCityController } from '@modules/cities/useCases/createCity/CreateCityController';
import { FindCitiesController } from '@modules/cities/useCases/findCities/FindCitiesController';
import { Router } from 'express';

const citiesRouter = Router();

citiesRouter.get('/', new FindCitiesController().handle);
citiesRouter.post('/', new CreateCityController().handle);

export { citiesRouter };
