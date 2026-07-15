# Exercise 6: Save Context Space

## Goal
Practice three habits that keep the context window lean, so Claude stays sharp and fast. This exercise gathers the lesson's tips into things you can try directly.

## Habit 1: Be specific
A vague prompt can look smaller, but it usually costs more context in the long run. Without clear instructions, Claude has to explore your codebase and reason to fill the gaps, which takes far more space than a detailed prompt would.

Try it. Compare a vague request with a precise one and watch how much exploring each triggers:

- Vague: `explain the snapshot stuff`
- Specific: `In src/api/snapshot.ts, explain what handleSnapshot validates before calling pullSnapshot.`

The specific version points Claude straight at the answer, so it reads less and reasons less.

## Habit 2: Manage your MCP servers
Each connected MCP server loads all of its tools into context by default, even the ones you are not using. Run `/context` and look at how much space tools take. If some servers are unrelated to the current task, turn them off. Skills are a lighter alternative, because they do not load everything up front.

## Habit 3: Use subagents
A subagent runs with its own separate context window and returns just a summary, which keeps your main window clean. Reach for one when you only need the answer to a lookup rather than the full trail.

For example, to locate the authentication code without loading every file into your main context, delegate a question like this:

```
where are the authentication endpoints located?
```

The subagent does the searching and reports back a short answer. In this demo that answer points at `src/auth/deviceAuth.ts`.

## Outcome
You have three concrete habits for keeping context lean: write specific prompts, prune MCP servers you do not need, and delegate lookups to subagents.
