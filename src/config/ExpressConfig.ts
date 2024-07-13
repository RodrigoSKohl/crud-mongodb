import express, { Application } from 'express';
import dotenv from 'dotenv';
import { errorHandler, successHandler } from '../middlewares/ResponseHandler';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware Globais
app.use(express.json());
app.use(successHandler);
app.use(errorHandler);

export { app, PORT };
