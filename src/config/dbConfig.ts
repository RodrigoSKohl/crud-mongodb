import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('A variável MONGODB_URI deve ser especificada no arquivo .env');
}

const dbOptions: ConnectOptions = {
  autoIndex: true,
  authSource: 'db',
};

export { MONGODB_URI, dbOptions };