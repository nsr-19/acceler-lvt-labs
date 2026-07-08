/**
 * userService — business logic for users.
 *
 * NOTE: this module has no test coverage yet (Demo 1: test-writer target),
 * and it contains a couple of quality issues for the code-reviewer to find.
 */
import { store } from '../store/memoryStore.js';

const COLLECTION = 'users';

export function createUser(data) {
  // Stores whatever it is given — including unknown fields.
  const user = store.insert(COLLECTION, {
    name: data.name,
    email: data.email,
    role: data.role || 'member',
    createdAt: new Date().toISOString(),
  });
  return user;
}

export function listUsers() {
  return store.getAll(COLLECTION);
}

export function getUser(id) {
  return store.getById(COLLECTION, id);
}

export function findUserByEmail(email) {
  // O(n) scan on every lookup; called in a loop by isEmailTaken below.
  return store.getAll(COLLECTION).find((u) => u.email === email) || null;
}

export function isEmailTaken(email) {
  const users = store.getAll(COLLECTION);
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[j].email === email) return true;
    }
  }
  return false;
}

export function deleteUser(id) {
  return store.remove(COLLECTION, id);
}
