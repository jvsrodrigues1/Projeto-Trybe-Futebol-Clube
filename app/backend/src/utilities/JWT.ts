import { sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const createToken = (payload:string | object) =>
  sign(payload, JWT_SECRET, jwtConfig);

export const tokenVerify = (token:string) => {
  try {
    const verifyToken = verify(token, JWT_SECRET);
    return verifyToken;
  } catch (error) {
    console.log(error);
  }
};
