import { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { validateObjectId } from '../middlewares/ValidateObjectID';
import { handleAsync } from '../middlewares/AsyncHandler'; // Importe o middleware handleAsync aqui

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Middleware para validar ObjectId em todas as rotas que usam '/users/:id'
    this.router.param('id', validateObjectId);

    // Rotas CRUD para usuários com o middleware handleAsync
    this.router.post('/api/users', handleAsync(UserController.create));
    this.router.get('/api/users', handleAsync(UserController.getAll));
    this.router.get('/api/users/:id', handleAsync(UserController.getById));
    this.router.put('/api/users/:id', handleAsync(UserController.update));
    this.router.delete('/api/users/:id', handleAsync(UserController.delete));
  }
}

export default new UserRoutes().router;