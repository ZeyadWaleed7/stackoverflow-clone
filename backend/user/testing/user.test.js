const request = require('supertest');
const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../src/controllers/userController');
const { authenticateJWT } = require('../src/middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.post('/users', createUser);
app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

describe('User Service', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'testuser', email: 'test@example.com', googleId: '12345' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should get a user by ID', async () => {
    const userId = 'valid-user-id'; // Replace with a valid user ID
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username');
  });

  it('should update a user by ID', async () => {
    const userId = 'valid-user-id'; // Replace with a valid user ID
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ username: 'updateduser' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toBe('updateduser');
  });

  it('should delete a user by ID', async () => {
    const userId = 'valid-user-id'; // Replace with a valid user ID
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
});
