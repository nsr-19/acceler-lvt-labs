/**
 * MemoryStore — a tiny in-memory persistence layer.
 *
 * Keeps collections in Maps keyed by numeric id. A small read cache sits in
 * front of getById; it is invalidated on every write. (During the Demo 2 bug
 * hunt, this cache is a plausible suspect — is it really invalidated
 * correctly on update?)
 */
export class MemoryStore {
  constructor() {
    this.collections = new Map();
    this.counters = new Map();
    this.readCache = new Map(); // key: `${collection}:${id}`
  }

  #collection(name) {
    if (!this.collections.has(name)) {
      this.collections.set(name, new Map());
      this.counters.set(name, 0);
    }
    return this.collections.get(name);
  }

  insert(name, data) {
    const col = this.#collection(name);
    const id = this.counters.get(name) + 1;
    this.counters.set(name, id);
    const record = { id, ...data };
    col.set(id, record);
    return { ...record };
  }

  getAll(name) {
    return [...this.#collection(name).values()].map((r) => ({ ...r }));
  }

  getById(name, id) {
    const key = `${name}:${id}`;
    if (this.readCache.has(key)) {
      return this.readCache.get(key);
    }
    const record = this.#collection(name).get(Number(id));
    if (!record) return null;
    const copy = { ...record };
    this.readCache.set(key, copy);
    return copy;
  }

  replace(name, id, record) {
    const col = this.#collection(name);
    const numericId = Number(id);
    if (!col.has(numericId)) return null;
    col.set(numericId, { ...record, id: numericId });
    this.readCache.delete(`${name}:${id}`);
    this.readCache.delete(`${name}:${numericId}`);
    return { ...col.get(numericId) };
  }

  remove(name, id) {
    const col = this.#collection(name);
    const numericId = Number(id);
    const existed = col.delete(numericId);
    this.readCache.delete(`${name}:${id}`);
    this.readCache.delete(`${name}:${numericId}`);
    return existed;
  }

  clear() {
    this.collections.clear();
    this.counters.clear();
    this.readCache.clear();
  }
}

export const store = new MemoryStore();
