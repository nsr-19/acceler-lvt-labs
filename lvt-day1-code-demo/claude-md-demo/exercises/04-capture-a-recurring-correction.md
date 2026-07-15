# Exercise 04: Capture a Recurring Correction (Optional)

The real value of `CLAUDE.md` comes from iterating on it. When you find yourself
correcting Claude on the same thing, save that correction to the file so it sticks for
next time. This optional exercise shows the fastest way to do that.

## What to Do

You have two ways to append a rule. You can type a line that starts with `#` to add it
directly, or you can simply ask Claude to make the change. Use the prompt from the
lesson:

```
Add a note to CLAUDE.md: log stream URLs without their query string,
since the query can contain a token.
```

## What to Observe

Claude updates `CLAUDE.md` for you, and from the next session that rule is part of its
context automatically. Watch for two things:

- A new instruction is added to the file that captures the correction you described.
- The rule is concrete. It says what to log and why (the query string can contain a
  token), which is exactly the kind of specific guidance that is hard to overlook.

This example also connects back to a security rule already in the file. The project
never hardcodes tokens, and a token can ride along in a stream URL query string, so
logging the URL without its query keeps that secret out of your logs.

## What to Look for in the Code

There is no source code to change in this exercise. The artefact you inspect is the
`CLAUDE.md` file itself. Open it after the change and confirm the new line reads
clearly on its own, so that a future session applies it without needing the context of
this conversation.

## Learning Outcome

A `CLAUDE.md` is a living document. Capturing corrections as you hit them, rather than
writing a large file up front, keeps the file focused on the rules that reflect real
friction. Over time this habit is what turns a decent file into a genuinely useful
one.

## Where to Go Next

The lesson closes with a few habits that pair well with `CLAUDE.md`:

- Commit `CLAUDE.md` so the whole team shares the same conventions.
- Add a personal, user level memory file for preferences that apply across all your
  projects.
- Pair it with subagents for isolated phases, such as a security review, and use
  `/clear` to reset context between unrelated tasks while keeping `CLAUDE.md` loaded.

Return to the [exercises index](README.md) for the full list of key takeaways.
