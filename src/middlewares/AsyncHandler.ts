import { Request, Response, NextFunction } from 'express';

// Middleware para lidar com funções assíncronas
export const handleAsync = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error('Erro no manipulador async:', error);
      if (!res.headersSent) {
        res.status(500).send('Erro interno do servidor');
      }
    }
  };
};