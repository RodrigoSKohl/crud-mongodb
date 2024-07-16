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

    // Rotas CRUD para usuários com o middleware handleAsync
    this.router.post('/api/user', handleAsync(UserController.create));
    this.router.get('/api/user', handleAsync(UserController.getAll));
    this.router.get('/api/user/:id', handleAsync(UserController.getById));
    this.router.put('/api/user/:id', handleAsync(UserController.update));
    this.router.delete('/api/user/:id', handleAsync(UserController.delete));
  }
}

export default new UserRoutes().router;