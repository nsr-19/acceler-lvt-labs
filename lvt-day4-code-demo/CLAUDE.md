# TaskFlow — project memory

This file is loaded by Claude Code at the start of every session — and, importantly
for Day 4, by every **custom subagent** and every **agent team teammate** you spawn.
It is the shared brain of the project. (The built-in Explore and Plan subagents skip
it to keep research fast.)

## What this project is

A small Express REST API for managing tasks and users. It exists as the target
codebase for the Day 4 orchestration demos. It is intentionally imperfect: some
routes are missing validation, one service has no tests, and there is one seeded
production bug. Do not "helpfully" fix things that a demo has not asked for yet.

## Commands

- `npm test` — run the vitest suite (must stay green)
- `npm start` — start the API on port 3000
- `npm run dev` — start with file watching

## Architecture

Request flow: `src/routes/*` (HTTP + validation) → `src/services/*` (business
logic) → `src/store/memoryStore.js` (in-memory persistence). Errors funnel into
`src/middleware/errorHandler.js`.

## Conventions

- ES modules only (`import`/`export`), no CommonJS.
- Routes own HTTP concerns (status codes, validation). Services own logic.
  The store owns persistence. Don't blur the layers.
- Tests live in `tests/`, written with vitest + supertest against `createApp()`.
- Every bug fix must land with a regression test.
- **One file, one owner**: when working in parallel (agent teams, workflows),
  never edit a file another agent owns in the same run.

## Compound learning

When you discover a pattern, gotcha, or convention worth keeping, append it under
"Learned rules" below. This is how the harness gets smarter over time.

## Learned rules

- (empty — demos will add entries here)
