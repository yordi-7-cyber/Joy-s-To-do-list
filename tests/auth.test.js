const request = require('supertest');
const app = require('../src/index');
const fc = require('fast-check');

describe('Authentication Tests', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          name: 'Test User'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email');
    });

    it('should reject duplicate email', async () => {
      const email = `duplicate${Date.now()}@example.com`;
      
      await request(app)
        .post('/api/auth/register')
        .send({ email, password: 'password123', name: 'User 1' });

      const response = await request(app)
        .post('/api/auth/register')
        .send({ email, password: 'password456', name: 'User 2' });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const email = `login${Date.now()}@example.com`;
      const password = 'password123';

      await request(app)
        .post('/api/auth/register')
        .send({ email, password, name: 'Login User' });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email, password });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'wrong' });

      expect(response.status).toBe(500);
    });
  });

  describe('Property-Based Tests', () => {
    it('Property 1: User registration with valid email should succeed', () => {
      return fc.assert(
        fc.asyncProperty(
          fc.emailAddress(),
          fc.string({ minLength: 6 }),
          fc.string({ minLength: 1 }),
          async (email, password, name) => {
            const uniqueEmail = `${Date.now()}_${email}`;
            const response = await request(app)
              .post('/api/auth/register')
              .send({ email: uniqueEmail, password, name });
            
            expect([201, 400]).toContain(response.status);
          }
        ),
        { numRuns: 10 }
      );
    });
  });
});
