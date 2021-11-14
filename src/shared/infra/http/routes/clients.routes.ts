import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { FindClientByIdController } from '@modules/clients/useCases/findClientById/FindClientByIdController';
import { FindClientsController } from '@modules/clients/useCases/findClients/FindClientsController';
import { Router } from 'express';

const clientsRouter = Router();

clientsRouter.get('/', new FindClientsController().handle);
clientsRouter.get('/:id', new FindClientByIdController().handle);
clientsRouter.post('/', new CreateClientController().handle);

export { clientsRouter };
