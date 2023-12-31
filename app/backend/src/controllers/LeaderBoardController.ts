import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IAllLeaderBoards';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async getLeaderbords(req:Request, res:Response) {
    res.status(200).json(await this._service.getLeaderboards());
  }
}
