import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('A variável MONGODB_URI deve ser especificada no arquivo .env');
}

class Database {
  private mongoose: Mongoose;

  constructor(private uri: string, private options: ConnectOptions) {
    this.mongoose = mongoose;
  }

  public async connect(): Promise<void> {
    try {
      await this.mongoose.connect(this.uri, this.options);
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.error('Erro de conexão com o MongoDB:', error);
      throw error;
    }
  }

  public getConnection() {
    return this.mongoose.connection;
  }

  public async disconnect(): Promise<void> {
    await this.mongoose.disconnect();
    console.log('Desconectado do MongoDB');
  }
}

const options: ConnectOptions = {
  autoIndex: true,
  authSource: 'db',
};

const db = new Database(MONGODB_URI, options);

export default db;