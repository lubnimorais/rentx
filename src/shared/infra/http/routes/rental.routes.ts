import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCase/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCase/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRouter = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);
rentalsRouter.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);

export { rentalsRouter };
