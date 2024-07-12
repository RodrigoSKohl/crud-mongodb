import { Router, Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/User';
import { Controller } from '../utils/Controller';

const userController = new Controller<UserDocument>(UserModel.getModel());

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/users', this.create);
    this.router.get('/users', this.getAll);
    this.router.get('/users/:id', this.getById);
    this.router.put('/users/:id', this.update);
    this.router.delete('/users/:id', this.delete);
  }

  private create = async (req: Request, res: Response): Promise<void> => {
    await userController.create(req, res);
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await userController.getAll(req, res);
  };

  private getById = async (req: Request, res: Response): Promise<void> => {
    await userController.getById(req, res);
  };

  private update = async (req: Request, res: Response): Promise<void> => {
    await userController.update(req, res);
  };

  private delete = async (req: Request, res: Response): Promise<void> => {
    await userController.delete(req, res);
  };
}

export default new UserRoutes().router;