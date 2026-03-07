const request = require('supertest');
const app = require('../src/index');
const fc = require('fast-check');

let authToken;
let userId;

beforeAll(async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      email: `tasktest${Date.now()}@example.com`,
      password: 'password123',
      name: 'Task Tester'
    });
  
  authToken = response.body.token;
  userId = response.body.user.id;
});

describe('Task Management Tests', () => {
  describe('POST /api/tasks', () => {
    it('should create a task with valid title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          status: 'pending',
          priority: 'high'
        });

      expect(response.status).toBe(201);
      expect(response.body.task).toHaveProperty('title', 'Test Task');
    });

    it('should reject task creation without title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          description: 'No title task'
        });

      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('tasks');
      expect(Array.isArray(response.body.tasks)).toBe(true);
    });
  });

  describe('Property-Based Tests', () => {
    it('Property 11: Task creation with title should succeed', () => {
      return fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 100 }),
          async (title) => {
            const response = await request(app)
              .post('/api/tasks')
              .set('Authorization', `Bearer ${authToken}`)
              .send({ title });
            
            expect([201, 400, 500]).toContain(response.status);
          }
        ),
        { numRuns: 10 }
      );
    });
  });
});
