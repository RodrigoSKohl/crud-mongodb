import express, { Application } from 'express';
import dotenv from 'dotenv';
import config from './jwtConfig';
import cors from 'cors'
import { corsOptions } from './corsConfig';
import { errorHandler, successHandler } from '../middlewares/responseHandler';

dotenv.config();
const port = process.env.PORT || 3000;

const app: Application = express();
// Middleware Globais
app.use(cors(corsOptions));
app.use(express.json());
app.use(successHandler);
app.use(errorHandler);

console.log(`JWT Secret Key: ${config.jwtSecret}`); // Apenas para debug, remover em produção

export { app, port };