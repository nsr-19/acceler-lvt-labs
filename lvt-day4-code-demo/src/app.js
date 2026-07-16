import express from 'express';
import tasksRouter from './routes/tasks.js';
import usersRouter from './routes/users.js';
import healthRouter from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/api/tasks', tasksRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/health', healthRouter);

  app.use((req, res) => res.status(404).json({ error: 'not found' }));
  app.use(errorHandler);

  return app;
}
