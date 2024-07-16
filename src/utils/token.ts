import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';

interface TokenPayload {
  [key: string]: any;
}

class AuthToken {
  private jwtSecret: string;
  private jwtExpiration: string;

  constructor() {
    this.jwtSecret = config.jwtSecret;
    this.jwtExpiration = config.jwtExpiration;
  }

  public signToken(payload: TokenPayload): string {
    const uniquePayload = {
      ...payload,
      timestamp: Date.now()
    };
    return jwt.sign(uniquePayload, this.jwtSecret, { expiresIn: this.jwtExpiration });
  }

  public verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
      return decoded;
    } catch (err) {
      throw new Error('Token inválido');
    }
  }
}

export default new AuthToken();