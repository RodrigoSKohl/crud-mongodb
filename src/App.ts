import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './utils/Connect';
import userRoutes from './routes/UserRoutes';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON parsing
app.use(express.json());

// Conectar ao MongoDB
db.connect()
  .then(() => {

    // Registrar rotas
    app.use('/api', userRoutes);

    // Rota padrão
    app.get('/', (req: Request, res: Response) => {
      res.send('API funcionando corretamente.');
    });

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor Express iniciado na porta ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });