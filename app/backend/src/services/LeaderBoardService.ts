import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamsModels';
import MatchesModel from '../database/models/MatchesModels';
import ILeaderboard from '../interfaces/ILeaderboard';
import IServiceLeaderboard from '../interfaces/IAllLeaderBoards';

export default class Leaderboard implements IServiceLeaderboard {
  protected modelTeam: ModelStatic<TeamModel> = TeamModel;
  protected modelMatch: ModelStatic<MatchesModel> = MatchesModel;

  async getLeaderboards(): Promise<ILeaderboard[]> {
    const MATCHES = await this.modelMatch.findAll({ where: { inProgress: false } });
    const TEAMS = await this.modelTeam.findAll();

    const homeLeaderBoards = TEAMS.map((e) => ({
      name: e.teamName,
      totalPoints: Leaderboard.getPointsHome(MATCHES, e.id),
      totalGames: Leaderboard.getTotalGamesInHome(MATCHES, e.id),
      totalVictories: Leaderboard.getVictoriesHome(MATCHES, e.id),
      totalDraws: Leaderboard.getTotalDraws(MATCHES, e.id),
      totalLosses: Leaderboard.getHomeLoses(MATCHES, e.id),
      goalsFavor: Leaderboard.getHomeGoals(MATCHES, e.id),
      goalsOwn: Leaderboard.getHomeOwns(MATCHES, e.id),
      goalsBalance: Leaderboard.getHomeBalance(MATCHES, e.id),
      efficiency: Number(Leaderboard.getHomeEfficiency(MATCHES, e.id)),
    }));
    const order = Leaderboard.getOrderHomeLeaderboard(homeLeaderBoards);
    return order;
  }

  static getPointsHome(findPoints:MatchesModel[], id:number) {
    let homeScores = 0;
    findPoints.filter((e) => {
      if (e.homeTeamId === id) {
        if (e.homeTeamGoals > e.awayTeamGoals) { homeScores += 3; }
        if (e.homeTeamGoals === e.awayTeamGoals) { homeScores += 1; }
      }
      return homeScores;
    });
    return homeScores;
  }

  static getVictoriesHome(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
  }

  static getTotalDraws(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
  }

  static getHomeLoses(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
  }

  static getTotalGamesInHome(findVictory:MatchesModel[], id:number) {
    const vic = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
    const draws = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
    const losses = findVictory.filter((e) => e.homeTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
    return vic + draws + losses;
  }

  static getHomeGoals(findGoals:MatchesModel[], id:number) {
    let goalsFavor = 0;
    findGoals.filter((e) => {
      if (e.homeTeamId === id) {
        goalsFavor += e.homeTeamGoals;
      }
      return goalsFavor;
    });
    return goalsFavor;
  }

  static getHomeOwns(findGoals:MatchesModel[], id:number) {
    let goalsOwn = 0;
    findGoals.filter((e) => {
      if (e.homeTeamId === id) {
        goalsOwn += e.awayTeamGoals;
      }
      return goalsOwn;
    });
    return goalsOwn;
  }

  static getHomeBalance(findGoals:MatchesModel[], id:number) {
    let GP = 0;
    let GC = 0;
    findGoals.filter((e) => {
      if (e.homeTeamId === id) {
        GP += e.homeTeamGoals;
        GC += e.awayTeamGoals;
      }
      return GP - GC;
    });
    return GP - GC;
  }

  static getHomeEfficiency(match:MatchesModel[], id:number) {
    const totalPoints = Leaderboard.getPointsHome(match, id);
    const totalGames = (Leaderboard.getTotalGamesInHome(match, id)) * 3;

    const efficiency = ((totalPoints / totalGames) * 100).toFixed(2);
    return efficiency;
  }

  static getOrderHomeLeaderboard(order:ILeaderboard[]) {
    order.sort((a:ILeaderboard, b:ILeaderboard) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return b.goalsOwn - a.goalsOwn;
      return b.goalsOwn - a.goalsOwn;
    });
    return order;
  }
}
