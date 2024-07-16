import { Request, Response } from 'express';
import UserModel, { UserDocument } from '../models/user';
import { Controller } from './_controller';

const userController = new Controller<UserDocument>(UserModel.getModel());

class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    await userController.create(req, res);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    await userController.getAll(req, res);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    await userController.getById(req, res);
  }

  public async update(req: Request, res: Response): Promise<void> {
    await userController.update(req, res);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    await userController.delete(req, res);
  }

  // Método personalizado para buscar por email
  public async findByEmail(email: string): Promise<UserDocument | null> {
    return await UserModel.getModel().findOne({ email }).exec();
  }
}

export default new UserController();