import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';

export const signToken = (payload: object) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
};