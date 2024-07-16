import express, { Application } from 'express';
import dotenv from 'dotenv';
import config from './jwtConfig';
import cors from 'cors'
import { corsOptions } from './corsConfig';

dotenv.config();
const port = process.env.PORT || 3000;
process.env.NODE_ENV = 'production';

const app: Application = express();
// Middleware Globais
app.use(cors(corsOptions));
app.use(express.json());

console.log(`JWT Secret Key: ${config.jwtSecret}`); // Apenas para debug, remover em produção

export { app, port };