# Exercise 1: Check Your Starting Context

## Goal
See how full the context window is before you do any work, so you have a baseline to compare against later.

## Steps
1. Make sure Claude Code is running in this folder.
2. Send the context command:

```
/context
```

## What to observe
You get an overview of how much of the window is in use, along with a breakdown by category. Typical categories include:

- your `CLAUDE.md` project instructions,
- any connected MCP server tools,
- the conversation so far.

Note roughly how full the window is right now. This is your baseline. Because you have not read any files yet, most of the space in use comes from fixed costs such as `CLAUDE.md` and any connected tools, not from your conversation.

## Outcome
You know how to inspect context usage on demand, and you have a starting number to compare against after you do some work in Exercise 2.
