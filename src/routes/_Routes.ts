import { Router, Response } from 'express';

const router = Router();

// Rota padrão
router.get('/', (_, res: Response) => {
    res.status(404).json({ success: 'API OK' });
});

// Rota genérica para capturar qualquer rota não definida dentro de /api
router.use('/*', (_, res: Response) => {
  res.status(404).json({ error: 'route not found' });
});

export default router;