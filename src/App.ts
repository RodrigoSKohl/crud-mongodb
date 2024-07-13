import db from './loader/Connect';
import {migrate} from './loader/AutoMigrate'; // Importe a função de migração automática
import loadRoutes from './loader/Routes';
import { app, PORT } from './config/ExpressConfig';

const startServer = async () => {
  try {

    // Executar migrações automáticas dinamicamente
    await db.connect();
    await migrate();

    // Carregar todas as rotas dinamicamente
    loadRoutes(app);

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor Express iniciado na porta ${PORT}.`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

startServer();