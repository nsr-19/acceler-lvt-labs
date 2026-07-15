# Exercise 4: Clear Before an Unrelated Task

## Goal
Start completely fresh when you switch to unrelated work, so the previous conversation does not bias the new task.

## Context
Imagine you are done with the snapshot flow and are switching to something completely different, such as the authentication module. You do not want the snapshot exploration influencing the new work.

## Steps
1. Wipe the session:

```
/clear
```

2. Check the window:

```
/context
```

## What to observe
The session is wiped. Your `CLAUDE.md` remains loaded, so project conventions survive, but the snapshot conversation is gone. When you run `/context`, usage is back near the baseline you saw in Exercise 1.

## Compact or clear: how to choose
- Use `/compact` when you are staying on the same feature and need to continue near the limit. It keeps a summary.
- Use `/clear` when you move to unrelated work and want no memory of the previous session. It keeps nothing from the conversation.

Choosing `/compact` when you meant to `/clear` is a common mistake. If a new task feels biased by old work, you probably compacted when you should have cleared.

## Outcome
You can reset to a clean slate on demand, and you know when clearing beats compacting.
