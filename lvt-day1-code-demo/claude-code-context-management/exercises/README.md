# Exercises: Managing Context in Claude Code

These guides turn the Context Management lesson into hands on practice you can run inside this demo folder. Work through them in order. Each one takes only a few minutes, and together they cover the full lesson.

## Before you start
- Claude Code installed and running. The `claude` command should work in your terminal.
- This demo folder open in your terminal. Launch Claude Code from here:

```bash
cd claude-code-context-management
claude
```

- Be ready to run `/context` several times. You will use it to watch the numbers move as you work.

## How to use these guides
Each guide follows the same shape:

- **Goal**: the single idea you are practicing.
- **Steps**: what to type, in order.
- **Prompt**: the exact text to send, shown in a code block so you can copy it.
- **What to observe**: what should change on screen.
- **What to look for in the code**: where relevant, the files that explain the result.
- **Outcome**: what you should walk away understanding.

Run the guides in this order:

1. [Check your starting context](01-check-your-starting-context.md)
2. [Fill the context with real work](02-fill-the-context-with-real-work.md)
3. [Compact to keep going](03-compact-to-keep-going.md)
4. [Clear before an unrelated task](04-clear-before-an-unrelated-task.md)
5. [Persist what should survive](05-persist-what-should-survive.md)
6. [Save context space](06-save-context-space.md)

## Key takeaways
- Context is finite working memory. Every prompt you send, every file Claude reads, and every command result takes up a slice of it.
- `/context` shows how full the window is and which categories consume the most space. Check it when things feel sluggish or before a big task.
- `/compact` summarizes the conversation so far and keeps the summary, freeing space while preserving a memory of what you were doing.
- `/clear` wipes the session entirely for a clean start. Your `CLAUDE.md` stays loaded.
- Reach for `/compact` when you are staying on the same feature near the limit. Reach for `/clear` when you move to unrelated work and do not want the old conversation to bias it.
- Persist anything durable in `CLAUDE.md` so it survives both compaction and clearing.
- Save space by being specific, by turning off MCP servers you do not need, and by delegating lookups to subagents.
- Treat context like working memory. Keep it lean, and Claude works sharper.

## A note on the demo code
The code under `src/` is intentionally small and simplified so it is quick to read. It exists as material to explore while you practice these commands. Treat it as read only for these exercises, and leave any comment that marks something as intentional exactly as written. See the note on intentional flaws in the root `README.md`.
