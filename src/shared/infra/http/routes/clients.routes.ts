import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { DeleteClientController } from '@modules/clients/useCases/deleteClient/DeleteClientController';
import { FindClientByIdController } from '@modules/clients/useCases/findClientById/FindClientByIdController';
import { FindClientsController } from '@modules/clients/useCases/findClients/FindClientsController';
import { Router } from 'express';

const clientsRouter = Router();

clientsRouter.get('/', new FindClientsController().handle);
clientsRouter.get('/:id', new FindClientByIdController().handle);
clientsRouter.post('/', new CreateClientController().handle);
clientsRouter.delete('/:id', new DeleteClientController().handle);

export { clientsRouter };
