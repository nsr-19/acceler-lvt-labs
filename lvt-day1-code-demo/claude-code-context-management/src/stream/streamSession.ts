// src/stream/streamSession.ts
// Manages the lifecycle of a single camera stream session.
export interface StreamSession {
  id: string;
  host: string;
  startedAt: number;
}

const sessions = new Map<string, StreamSession>();

export function openSession(host: string): StreamSession {
  const session: StreamSession = {
    id: `${host}-${Date.now()}`,
    host,
    startedAt: Date.now(),
  };
  sessions.set(session.id, session);
  return session;
}

export function closeSession(id: string): boolean {
  return sessions.delete(id);
}
