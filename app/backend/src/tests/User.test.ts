import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes na rota /users e /login', () => {

  let HttpChaiResponse: Response;

  test(`Testa se não é possível efetuar login sem um email ou password na rota GET/login.`, async () => {
    const invalidEmail = {
      "email": "",
      "password": "passwordteste123"
    }
    const invalidPassword = {
      "email": "teste@teste.com",
      "password": ""
    }
    const resinvalidEmail = await chai.request(app).post('/login').send(invalidEmail);
    expect(resinvalidEmail.status).to.be.deep.equal(400);
    const resinvalidPassword = await chai.request(app).post('/login').send(invalidPassword);
    expect(resinvalidPassword.status).to.be.deep.equal(400);

  });
  test(`Testa se não é possível efetuar login com um usuário inválido na rota POST/login.`, async () => {
    const wrongUser = {
      "email": "test@test.com",
      "password": "pass1"
    }
    const user = await chai.request(app).post('/login').send(wrongUser);
    expect(user.status).to.be.deep.equal(401);

  });

  test(`Testa se é possível efetuar login com um usuário válido na rota POST/login.`, async () => {
    const wrongUser = {
      "email": "user@user.com",
      "password": "secret_user"
    }
    const user = await chai.request(app).post('/login').send(wrongUser);
    expect(user.status).to.be.deep.equal(200);

  });

  test(`Testa se um token não é retornado ao efetuar login com dados inválidos na rota GET/login/role.`, async () => {
    const wrongUser = {
      "email": "test@test.com",
      "password": "pass1"
    }
    const user = await chai.request(app).get('/login/role').send(wrongUser);
    expect(user.status).to.be.deep.equal(401);

  });

});
