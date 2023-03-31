import { NextFunction, Request, Response } from 'express';

const REGEX_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
const LOGIN_INVALID = 'Invalid email or password';
const LOGIN_MISSSING_FIELDS = 'All fields must be filled';

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    res.status(400).json({ message: LOGIN_MISSSING_FIELDS });
    return;
  }
  if (!REGEX_EMAIL.test(email)) {
    res.status(401).json({ message: LOGIN_INVALID });
    return;
  }
  if (password.length < 6) {
    res.status(401).json({ message: LOGIN_INVALID });
    return;
  }
  next();
}
