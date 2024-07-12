import { Schema, model, Document } from 'mongoose';
import Crypt from '../utils/Crypt'; // Importe sua classe Crypt aqui

// Interface que representa os campos do usuário
interface IUser {
  username: string;
  email: string;
  password: string;
}

// Interface que estende Document, representando o documento de usuário
export interface UserDocument extends IUser, Document {}

// Classe que representa o modelo de usuário
class UserModel {
  private schema: Schema<UserDocument>;

  constructor() {
    // Definição do esquema mongoose para usuário
    this.schema = new Schema<UserDocument>({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    });

    // Middleware para criptografar a senha antes de salvar
    this.schema.pre<UserDocument>('save', async function(next) {
      if (this.isModified('password')) {
        const hashedPassword = await Crypt.hashPassword(this.password);
        this.password = hashedPassword;
      }
      next();
    });
  }

  // Método para obter o modelo mongoose
  getModel() {
    return model<UserDocument>('Users', this.schema);
  }
}

// Exportando uma instância da classe UserModel
export default new UserModel();