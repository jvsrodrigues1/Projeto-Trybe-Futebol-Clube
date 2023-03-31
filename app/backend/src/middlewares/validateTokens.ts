import { NextFunction, Request, Response } from 'express';
import { tokenVerify } from '../utilities/JWT';

const TOKEN_INVALID = 'Token must be a valid token';
const TOKEN_404 = 'Token not found';

export default function validateToken(req:Request, res:Response, next:NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: TOKEN_404 });
  }
  try {
    const authToken = tokenVerify(authorization);
    if (!authToken) return res.status(401).json({ message: TOKEN_INVALID });
    res.locals.user = authToken;
    next();
  } catch (error) {
    res.status(401).json({ message: TOKEN_INVALID });
  }
}
