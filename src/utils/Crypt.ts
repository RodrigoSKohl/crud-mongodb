import bcrypt from 'bcrypt';

class Crypt {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Número de rounds de hashing
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default Crypt;