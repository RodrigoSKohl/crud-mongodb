import { Request, Response } from 'express';
import UserController from './userController';
import Crypt from '../utils/crypt';
import { signToken } from '../utils/signToken';

class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as { email: string, password: string };

    try {
      const user = await UserController.findByEmail(email); 

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      const isValidPassword = await Crypt.comparePassword(password, user.password);

      if (!isValidPassword) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      const token = signToken({ userId: user._id });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro durante o login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new AuthController();