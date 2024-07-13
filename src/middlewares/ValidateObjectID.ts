import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: 'invalid id' }); // Retorna um objeto JSON com a mensagem de erro
  } else {
    next(); // Chama next() apenas se o ID for válido
  }
};  