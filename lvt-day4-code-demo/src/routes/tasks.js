import { Router } from 'express';
import * as tasks from '../services/taskService.js';

const router = Router();
const UPDATABLE_FIELDS = ['title', 'description', 'completed'];

// POST /api/tasks
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = tasks.createTask(req.body);
  res.status(201).json(task);
});

// GET /api/tasks
router.get('/', (req, res) => {
  res.json(tasks.listTasks());
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  const task = tasks.getTask(req.params.id);
  if (!task) return res.status(404).json({ error: 'task not found' });
  res.json(task);
});

// PATCH /api/tasks/:id
router.patch('/:id', (req, res) => {
  const updates = {};
  for (const field of UPDATABLE_FIELDS) {
    if (req.body[field]) {
      updates[field] = req.body[field];
    }
  }

  const task = tasks.updateTask(req.params.id, updates);
  if (!task) return res.status(404).json({ error: 'task not found' });
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  const removed = tasks.deleteTask(req.params.id);
  if (!removed) return res.status(404).json({ error: 'task not found' });
  res.status(204).end();
});

export default router;
