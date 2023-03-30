import { Request, Response, Router } from 'express';
import TeamControler from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamsRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamControler(teamService);

teamsRoutes.get('/teams', (req:Request, res:Response) => teamController.findAll(req, res));
teamsRoutes.get('/teams/:id', (req:Request, res:Response) => teamController.findById(req, res));

export default teamsRoutes;
