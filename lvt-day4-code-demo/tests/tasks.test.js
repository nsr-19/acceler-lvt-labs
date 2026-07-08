import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { store } from '../src/store/memoryStore.js';

const app = createApp();

describe('tasks API', () => {
  beforeEach(() => store.clear());

  it('creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Write the demo' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Write the demo', completed: false });
  });

  it('rejects a task without a title', async () => {
    const res = await request(app).post('/api/tasks').send({ description: 'no title' });
    expect(res.status).toBe(400);
  });

  it('lists tasks', async () => {
    await request(app).post('/api/tasks').send({ title: 'One' });
    await request(app).post('/api/tasks').send({ title: 'Two' });
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('gets a task by id and 404s on a missing one', async () => {
    await request(app).post('/api/tasks').send({ title: 'Find me' });
    expect((await request(app).get('/api/tasks/1')).status).toBe(200);
    expect((await request(app).get('/api/tasks/99')).status).toBe(404);
  });

  it('updates a task title', async () => {
    await request(app).post('/api/tasks').send({ title: 'Old title' });
    const res = await request(app).patch('/api/tasks/1').send({ title: 'New title' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New title');
  });

  it('marks a task as completed', async () => {
    await request(app).post('/api/tasks').send({ title: 'Ship it' });
    const res = await request(app).patch('/api/tasks/1').send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  // NOTE: there is intentionally no test for PATCH { completed: false }.
  // That coverage gap is the subject of the Demo 2 bug hunt.

  it('deletes a task', async () => {
    await request(app).post('/api/tasks').send({ title: 'Remove me' });
    expect((await request(app).delete('/api/tasks/1')).status).toBe(204);
    expect((await request(app).get('/api/tasks/1')).status).toBe(404);
  });
});
