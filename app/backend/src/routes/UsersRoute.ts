import { Request, Response, Router } from 'express';
import validateLogin from '../middlewares/validateLogins';
import validateEmailPassword from '../middlewares/validatePasswordsEmails';
import validateToken from '../middlewares/validateTokens';
import UserServise from '../services/UserService';
import UserController from '../controllers/UserController';

const usersRoutes = Router();
const userService = new UserServise();
const userController = new UserController(userService);

usersRoutes.post(
  '/login',
  validateEmailPassword,
  validateLogin,
  (req:Request, res:Response) => userController.toLogin(req, res),
);

usersRoutes.get(
  '/login/role',
  validateToken,
  (req:Request, res:Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default usersRoutes;
