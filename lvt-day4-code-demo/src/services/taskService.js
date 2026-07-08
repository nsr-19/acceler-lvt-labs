/**
 * taskService — business logic for tasks.
 *
 * updateTask does a slightly convoluted merge before writing back to the
 * store. (During the Demo 2 bug hunt this merge is a plausible suspect —
 * does it actually persist what it returns?)
 */
import { store } from '../store/memoryStore.js';

const COLLECTION = 'tasks';

export function createTask({ title, description = '', completed = false }) {
  return store.insert(COLLECTION, {
    title,
    description,
    completed,
    createdAt: new Date().toISOString(),
  });
}

export function listTasks() {
  return store.getAll(COLLECTION);
}

export function getTask(id) {
  return store.getById(COLLECTION, id);
}

export function updateTask(id, updates) {
  const existing = store.getById(COLLECTION, id);
  if (!existing) return null;

  const merged = Object.keys(existing).reduce((acc, key) => {
    acc[key] = Object.prototype.hasOwnProperty.call(updates, key)
      ? updates[key]
      : existing[key];
    return acc;
  }, {});

  return store.replace(COLLECTION, id, merged);
}

export function deleteTask(id) {
  return store.remove(COLLECTION, id);
}
