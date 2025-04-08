import request from 'supertest';
import app from '../src/index';

describe('User API Integration Tests', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});