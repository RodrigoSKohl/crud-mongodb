import { Router } from 'express';
import UserController from '../controllers/userController';
import { validateObjectId } from '../middlewares/validateObjectID';
import { handleAsync } from '../middlewares/asyncHandler'; // Importe o middleware handleAsync aqui

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Middleware para validar ObjectId em todas as rotas que usam '/users/:id'
    this.router.param('id', validateObjectId);

    const apiRouter = Router();
    this.router.use('/api', apiRouter);

    // Rotas CRUD para usuários com o middleware handleAsync
    apiRouter.post('/user', handleAsync(UserController.create));
    apiRouter.get('/user', handleAsync(UserController.getAll));
    apiRouter.get('/user/:id', handleAsync(UserController.getById));
    apiRouter.put('/user/:id', handleAsync(UserController.update));
    apiRouter.delete('/user/:id', handleAsync(UserController.delete));

  }
}

export default new UserRoutes().router;