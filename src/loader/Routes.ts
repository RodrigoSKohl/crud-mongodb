import { Application } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const loadRoutes = (app: Application): void => {
  const routesDir = join(__dirname, '../routes');


  // Lê os arquivos na pasta routes
  readdirSync(routesDir).forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.ts')) {
      const route = require(join(routesDir, file)).default; // Importa o arquivo de rota
      if (route && route instanceof Function) {
        app.use('/', route); // Monta as rotas
        console.log(`Rota ${file} carregada.`);
      }
    }
  });
};

export default loadRoutes;