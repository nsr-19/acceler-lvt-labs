# Exercise 5: Persist What Should Survive

## Goal
Save a durable fact so it survives both compaction and clearing, and reloads automatically every session.

## Context
Both `/compact` and `/clear` discard detail. Anything Claude should remember across sessions does not belong in the conversation. It belongs in `CLAUDE.md`.

## Steps
1. Ask Claude to record a durable note. Send this prompt exactly:

```
Add a note to CLAUDE.md: snapshot requests must go through
src/api/snapshot.ts, which enforces TLS and validates the host.
```

2. Open `CLAUDE.md` and confirm the note is there.

## What to observe
The fact is now written into `CLAUDE.md`. From now on it loads every session and never has to be rediscovered. Even after a `/clear`, this note comes back, because `CLAUDE.md` stays loaded.

## What to look for in the code
The note describes real behavior in the demo. Open `src/api/snapshot.ts` and confirm it:

- checks the host against a pattern before doing anything,
- loads the device config,
- and hands off to the ONVIF integration, which uses an `https://` endpoint.

This is why the durable note is accurate: the code really does route snapshots through this one guarded entry point.

## Outcome
You know where durable memory lives and how to add to it, so important facts survive compaction, clearing, and new sessions.
