import { Router, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderBoardService';
import LeaderboardController from '../controllers/LeaderBoardController';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get(
  '/leaderboard/home',
  (req:Request, res:Response) => leaderboardController.getLeaderbords(req, res),
);
export default leaderboardRoutes;
