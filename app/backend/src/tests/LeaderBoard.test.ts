import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste LeaderBoard', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('Verifica a rota matches', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });


  it('Verifica a rota matches', async () => {
    chaiHttpResponse = await chai
       .request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

});