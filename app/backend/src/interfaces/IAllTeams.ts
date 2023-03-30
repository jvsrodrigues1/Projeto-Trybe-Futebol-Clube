import TeamModel from '../database/models/TeamsModels';

export default interface ITeamService {
  findAll(): Promise<TeamModel[]>;
  findById(id:number): Promise<TeamModel>;
}
