import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { Router } from 'express';

const clientsRouter = Router();

clientsRouter.post('/', new CreateClientController().handle);

export { clientsRouter };
