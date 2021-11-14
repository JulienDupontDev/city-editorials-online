import request from 'supertest';
import app from '../index.js';

//change email everytime
describe('Post endpoints', () => {
  it('should create a new city', (done) => {
    request(app)
      .post('/cities/')
      .send({
        name: 'test2',
        zipcode: 75000,
        country: 'France',
        user: {
          firstName: 'Juliden',
          lastName: 'DUdpont',
          password: 'test',
          confirmPassword: 'test',
          email: 'jdupont@ssssssssas.com',
        },
      })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode).toBe(200 || 201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('name');
        done();
      })
      .catch((err) => done(err));
  });

  it('should not create a new city', (done) => {
    request(app)
      .post('/cities/')
      .send({
        name: 'test2',
        zipcode: 75000,
        country: 'France',
        user: {
          firstName: 'Juliden',
          lastName: 'DUdpont',
          password: 'test',
          confirmPassword: 'test',
          email: 'jdupont@ssssssssas.com',
        },
      })
      .then((res) => {
        expect(res.statusCode === 400 || res.statusCode === 500).toBe(
          true,
        );
        done();
      })
      .catch((err) => done(err));
  });
});

describe('Get endpoints', () => {
  it('should get all cities', (done) => {
    request(app)
      .get('/cities/')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => done(err));
  });
});
