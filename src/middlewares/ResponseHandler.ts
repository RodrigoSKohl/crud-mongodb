import { Request, Response, NextFunction } from 'express';

// Middleware para formatar erros
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log do erro para depuração

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
      details: err.details // opcional, se precisar de mais informações
    }
  });
};

// Middleware para formatar sucesso
export const successHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent && res.locals.data) {
    res.status(200).json({
      success: true,
      data: res.locals.data
    });
  } else {
    next();
  }
};