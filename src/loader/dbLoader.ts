import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import { MONGODB_URI, dbOptions } from '../config/dbConfig';

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

const db = new Database(MONGODB_URI!, dbOptions);

export default db;