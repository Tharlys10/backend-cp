import { FindCitiesController } from '@modules/cities/useCases/findCities/FindCitiesController';
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { Router } from 'express';

const clientsRouter = Router();

clientsRouter.get('/', new FindCitiesController().handle);
clientsRouter.post('/', new CreateClientController().handle);

export { clientsRouter };
