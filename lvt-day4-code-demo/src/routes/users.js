import { Router } from 'express';
import * as users from '../services/userService.js';

const router = Router();

// POST /api/users
router.post('/', (req, res) => {
  const user = users.createUser(req.body);
  res.status(201).json(user);
});

// GET /api/users
router.get('/', (req, res) => {
  res.json(users.listUsers());
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = users.getUser(req.params.id);
  res.json(user);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  users.deleteUser(req.params.id);
  res.status(204).end();
});

export default router;
