import bcrypt from 'bcrypt';
import config from '../config/secretConfig'; // Importa o valor de saltRounds do arquivo de configuração

class Crypt {
  private saltRounds: number;

  constructor() {
    this.saltRounds = config.saltRounds as number;
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  public async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default Crypt;