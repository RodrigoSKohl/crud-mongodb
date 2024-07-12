import { Router, Request, Response, NextFunction } from 'express';
import UserModel, { UserDocument } from '../models/User';
import { Controller } from '../utils/Controller';
import mongoose from 'mongoose';

const userController = new Controller<UserDocument>(UserModel.getModel());

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.param('id', this.validateObjectId); // Middleware para validar ObjectId
    this.router.post('/users', this.create);
    this.router.get('/users', this.getAll);
    this.router.get('/users/:id', this.getById);
    this.router.put('/users/:id', this.update);
    this.router.delete('/users/:id', this.delete);
  }

  private validateObjectId = (req: Request, res: Response, next: NextFunction, id: string): Response<any, Record<string, any>> => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).send('ID de usuário inválido');
      }
      next();
      return res.status(200); // Add a return statement at the end of the function
  };

  private create = async (req: Request, res: Response): Promise<void> => {
    await userController.create(req, res);
  };

  private getAll = async (req: Request, res: Response): Promise<void> => {
    await userController.getAll(req, res);
  };

  private getById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const user = await userController.getById(req, res);
    res.status(200).json(user);
  };

  private update = async (req: Request, res: Response): Promise<void> => {
    const user = await userController.update(req, res);
    res.status(200).json(user);
  };

  private delete = async (req: Request, res: Response): Promise<void> => {
    const user = await userController.delete(req, res);
    res.status(200).json(user);
  };
}

export default new UserRoutes().router;