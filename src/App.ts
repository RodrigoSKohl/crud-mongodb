import db from './loader/dbLoader';
import {migrate} from './loader/autoMigrate';
import loadRoutes from './loader/routesLoader';
import { app, port } from './config/expressConfig';

const startServer = async () => {
  try {

    // Executar migrações automáticas dinamicamente
    await db.connect();
    await migrate();

    // Carregar todas as rotas dinamicamente
    loadRoutes(app);

    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor Express iniciado na porta ${port}.`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor: ', err);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

startServer();