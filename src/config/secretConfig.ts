import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
const jwtExpiration = process.env.JWT_EXPIRATION || '1h';
const saltRounds = process.env.SALT_ROUNDS || 10;

export default {
  jwtSecret: secretKey,
  jwtExpiration: jwtExpiration,
  saltRounds: saltRounds
};