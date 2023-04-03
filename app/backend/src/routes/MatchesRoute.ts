import { Request, Response, Router } from 'express';
import MatchesControler from '../controllers/MatchController';
import MatchesService from '../services/MatchService';
import validateNewMatch from '../middlewares/validateNewMatches';
import validateToken from '../middlewares/validateTokens';

const matchesRoutes = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesControler(matchesService);

matchesRoutes.get(
  '/matches',
  (req:Request, res:Response) => matchesController.findAll(req, res),
);

matchesRoutes.post(
  '/matches',
  validateToken,
  validateNewMatch,
  (req:Request, res:Response) => matchesController.createNewMatch(req, res),
);

matchesRoutes.patch(
  '/matches/:id',
  validateToken,
  (req:Request, res:Response) => matchesController.updateMatches(req, res),
);

matchesRoutes.patch(
  '/matches/:id/finish',
  validateToken,
  (req:Request, res:Response) => matchesController.finishMatches(req, res),
);

export default matchesRoutes;
