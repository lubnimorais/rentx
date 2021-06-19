import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticateRouter = Router();
const authenticateController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post('/sessions', authenticateController.handle);
authenticateRouter.post('/refresh-token', refreshTokenController.handle);

export { authenticateRouter };
