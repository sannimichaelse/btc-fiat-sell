import 'mocha';
import { expect } from 'chai';
import { agent as request } from 'supertest';
import { getRepository, Connection, Repository } from 'typeorm';

import { app } from '../../../src/index';
import { dbCreateConnection } from '../../../src/database/dbCreateConnection';
import { User } from '../../../src/database/entities/User';

describe('POST /v1/auth/register', () => {
  let dbConnection: Connection;
  let userRepository: Repository<User>;

  const userPassword = 'pass1222';
  const user = new User();
  user.email = 'brandon.mayhew@test.com';
  user.password = userPassword;
  user.hashPassword();

  before(async () => {
    dbConnection = await dbCreateConnection();
    userRepository = getRepository(User);
  });

  after(async () => {
    await dbConnection.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/v1/auth/register')
      .send({ email: user.email, password: userPassword});
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('User successfully created.');
    expect(res.body.data).to.be.an('null');
    await userRepository.delete({ email: user.email });
  });

  it('should report error when email already exists', async () => {
    let res = await request(app)
      .post('/v1/auth/register')
      .send({ email: user.email, password: userPassword });
    res = await request(app)
      .post('/v1/auth/register')
      .send({ email: user.email, password: userPassword,});
    expect(res.status).to.equal(400);
    expect(res.body.errorType).to.equal('General');
    expect(res.body.errorMessage).to.equal('User already exists');
    expect(res.body.errors).to.eql([`Email '${user.email}' already exists`]);
    expect(res.body.errorRaw).to.an('null');
    expect(res.body.errorsValidation).to.an('null');
    await userRepository.delete({ email: user.email });
  });
});
