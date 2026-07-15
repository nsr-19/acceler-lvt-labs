# Manage Context in Claude Code

A short hands-on walkthrough for keeping Claude's working memory lean. In about 10 minutes you will fill up the context window while working in a small camera-surveillance codebase, inspect what is consuming space, and practice the three commands that control it — `/context`, `/compact`, and `/clear`.

All examples use TypeScript.

In this demo, we will:

- Check how much context we are using and what is taking up space.
- Do some work to fill the context, then summarize it to keep going.
- Clear the context completely before starting an unrelated task.

---

## Background: what context is

Context is Claude's working memory for a session. Every prompt you send, every file Claude reads, and every command result takes up space in a **finite** context window. As it fills, Claude can lose track of earlier details, and it will automatically compact (summarize) the conversation to free space — which can drop details along the way. Managing context deliberately keeps Claude sharp and avoids surprises.

The three commands:

| Command | What it does |
|---|---|
| `/context` | Shows how full the window is and what is consuming the most space. |
| `/compact` | Summarizes the conversation so far and keeps the summary, freeing space while preserving memory of what you were doing. |
| `/clear` | Wipes the session entirely for a clean start. `CLAUDE.md` stays loaded. |

---

## Prerequisites

- Claude Code installed and running (`claude` is available in your terminal).
- The `demo-4-context-management` folder from the workshop bundle (a small sample codebase). Open it in your terminal:

```bash
cd demo-4-context-management
claude
```

---

## Step 1 — Check your starting context

Before doing anything, see the baseline:

```
/context
```

You will get an overview of how much of the window is in use and a breakdown by category — your `CLAUDE.md`, any connected MCP server tools, and the conversation so far. Note roughly how full it is.

---

## Step 2 — Fill the context with real work

Now do enough work to grow the context. Ask Claude to read and explain several files in the project:

```
Read the files in src/ and explain how a camera snapshot request flows
from the API route through to the device.
```

Claude reads `src/api/`, `src/integrations/`, `src/auth/`, and `src/stream/` and traces the flow. Every file it opens is now sitting in your context.

Check again:

```
/context
```

The usage has climbed, and the conversation/file-reads now take a visible slice. This is normal — it is the cost of the exploration you just did.

---

## Step 3 — Compact to keep going

You are still working on the same area and want to continue, but free up space. Summarize the session:

```
/compact
```

Claude replaces the detailed history with a structured summary and keeps it in context. Run `/context` once more to confirm usage dropped. You can keep working on the snapshot flow — Claude still remembers what it found, just in condensed form.

> Compaction can lose detail. If something matters for the long term, save it somewhere durable — see Step 5.

---

## Step 4 — Clear before an unrelated task

Now imagine you are switching to something completely different — say, the authentication module — and you do not want the snapshot exploration biasing the new work. Start fresh:

```
/clear
```

This wipes the session. Your `CLAUDE.md` remains loaded, so project conventions survive, but the snapshot conversation is gone. Run `/context` to see the window back near baseline.

---

## Step 5 — Persist what should survive

Compaction and clearing both discard detail. Anything Claude should remember across sessions belongs in `CLAUDE.md`. For example:

```
Add a note to CLAUDE.md: snapshot requests must go through
src/api/snapshot.ts, which enforces TLS and validates the host.
```

From now on that fact is loaded every session and never has to be rediscovered.

---

## Summary

- Context is finite working memory; every prompt, file, and result consumes it.
- `/context` shows usage and the biggest consumers — check it when things feel sluggish or before a big task.
- `/compact` summarizes and continues; `/clear` wipes for a fresh start.
- Use `/compact` to stay on the current feature near the limit; use `/clear` when moving to unrelated work.
- Persist anything durable in `CLAUDE.md` so it survives compaction and clearing.

---

## Tips for saving context space

- **Be specific.** A vague prompt looks smaller but costs more, because Claude has to explore and reason to fill the gaps. Clear instructions are cheaper overall.
- **Manage MCP servers.** Each connected server loads all of its tools into context, even unused ones. Turn off servers you do not need for the current task. Skills are a lighter alternative — they do not load everything up front.
- **Use subagents.** When you only need an answer (for example, "where is device authentication validated?"), delegate to a subagent. It works in its own context and returns just a summary, keeping your main window clean.

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Context fills surprisingly fast | Run `/context` to find the consumer. Large file reads or many MCP tools are common causes. |
| Claude forgot something after compaction | It was not durable. Put it in `CLAUDE.md` and it will reload each session. |
| New task feels biased by old work | You compacted when you should have cleared. Use `/clear` when switching to unrelated work. |
