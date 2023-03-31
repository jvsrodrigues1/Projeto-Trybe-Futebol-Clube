import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore dica da mentoria
import chaiHttp = require('chai-http');
import { app }  from '../app';
import { Response } from 'superagent';
import TeamModel from '../database/models/TeamsModels';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes na rota /teams', () => {
    
 let chaiResponseHttp: Response;

 const teamsList = [
  {
    "id": 4,
    "teamName": "Corinthians"
  },
    {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]
   beforeEach (async () => { sinon.stub(TeamModel, "findAll").resolves([
  {
    id: 4,
    teamName: "Corinthians"
  },
    {
    id: 5,
    teamName: "Cruzeiro"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
] as TeamModel[])});

   afterEach(()=>{ (TeamModel.findAll as sinon.SinonStub).restore()})


  test('Testa se a rota GET/teams retorna uma lista com todos os times corretamente', async() => {
 
    chaiResponseHttp = await chai.request(app).get('/teams');
    expect(chaiResponseHttp.status).to.be.equal(200);
    expect(chaiResponseHttp.body).to.be.deep.equal(teamsList);
    
  });
  test('Testa se a rota GET/teams/:id retorna dados do time Corinthians o maior do Mundo! ', async() => {
 
    chaiResponseHttp = await chai.request(app).get('/teams/4').send();
    expect(chaiResponseHttp.status).to.be.equal(200);
    
    
  });

   test('Testa se GET /teams:id retorna o time correspondente ao id', async () => {
    chaiResponseHttp = await chai
    .request(app)
    .get('/teams/2')

    expect(chaiResponseHttp.body).to.be.deep.equals(teamsList);
  });
  test('Testa se GET /teams:id retorna o time correspondente ao id', async () => {
    chaiResponseHttp = await chai
    .request(app)
    .post('/login')

    expect(chaiResponseHttp.body).to.be.deep.equals(teamsList);
});
});