import TeamModel from '../database/models/TeamsModels';

export default interface IServiceTeam {
  findAll(): Promise<TeamModel[]>;
  findById(id:number): Promise<TeamModel>;
}
