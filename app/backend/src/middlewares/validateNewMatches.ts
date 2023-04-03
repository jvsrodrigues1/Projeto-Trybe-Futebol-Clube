import { NextFunction, Request, Response } from 'express';
import MatchesService from '../services/MatchService';

const CANT_CREATE_NEW_MATCH = 'It is not possible to create a match with two equal teams';
const TEAM_NOT_FOUND = 'There is no team with such id!';

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({ message: CANT_CREATE_NEW_MATCH });
  }

  const matchesService = new MatchesService();
  const home = await matchesService.findById(homeTeamId);
  const away = await matchesService.findById(awayTeamId);

  if (!home || !away) {
    return res.status(404).json({ message: TEAM_NOT_FOUND });
  }
  next();
}
