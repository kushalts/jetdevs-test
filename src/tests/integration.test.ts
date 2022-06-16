import 'jest';
import express, { Application } from 'express';
import { faker } from '@faker-js/faker';
// import dotenv from 'dotenv';
import * as supertestRequest from 'supertest';
const request = require('supertest');

// import * as express from 'express';
import { App } from '../app';

let app: Application = express();

describe('status integration tests', () => {
  let token = '';
  beforeAll(async () => {
    const application = new App();
    app = await application.listen();
  });
  beforeEach(async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin1@gmail.com', password: '12345678' })
      .then((res: supertestRequest.Response) => {
        token = res.body.response_data.token;
      });
  });
  it('Positive Login', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin1@gmail.com', password: '12345678' })
      .expect(200)
      .then((res: supertestRequest.Response) => {
        expect(res.body.response_data).toHaveProperty('email');
        expect(res.body.response_data).toHaveProperty('role');
        expect(res.body.response_data).toHaveProperty('token');
        token = res.body.response_data.token;
      });
  });
  it('Negative Login', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin1@gmail.com', password: '12345677' })
      .expect(401);
  });
  it('Positive Register', async () => {
    await request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send({ email: faker.internet.email(), password: '12345678', role: 'user' })
      .expect(200)
      .then((res: supertestRequest.Response) => {
        console.log(res.body);
      });
  });
  it('Negative Register', async () => {
    await request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'admin1@gmail.com', password: '12345677' })
      .expect(401);
  });
  it('Positive File Lists', async () => {
    await request(app)
      .get('/file')
      .set('Authorization', token)
      .expect(200)
      .then((res: supertestRequest.Response) => {
        expect(res.body).toHaveProperty('count');
        expect(res.body).toHaveProperty('rows');
      });
  });
  it('Negative File Lists', async () => {
    await request(app)
      .get('/file')
      .expect(400)
      .then((res: supertestRequest.Response) => {
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('Inavalid token..!');
      });
  });
});
