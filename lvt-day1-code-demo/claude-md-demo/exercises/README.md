# Exercises: Create a CLAUDE.md for Your Project

These guides turn the lesson *"The CLAUDE.md File"* into a hands on walkthrough you
can follow inside this repository. In about ten minutes you will create a `CLAUDE.md`
for a camera surveillance codebase, start a Claude Code session, and watch Claude
follow your conventions automatically without being reminded.

All examples use TypeScript.

## How to Use These Exercises

1. Open a terminal in the root of this repository.
2. Work through the guides in order. Each one is self contained and tells you what to
   do, what to observe, what to look for in the code, and the learning outcome.
3. When a guide shows a prompt in a fenced code block, type that prompt to Claude Code
   exactly as written. The prompts are quoted verbatim from the lesson.
4. Read only the code the guide points you to. You do not need to change any existing
   file to complete these exercises. The one place you create new code is the Axis
   integration in Exercise 03, and you build that yourself by asking Claude.

## The Exercises

| Order | Guide | What you practise |
|-------|-------|-------------------|
| 01 | [01-create-the-claude-md.md](01-create-the-claude-md.md) | Writing a focused `CLAUDE.md` that captures real project friction |
| 02 | [02-start-a-session.md](02-start-a-session.md) | Confirming Claude loads the file automatically at session start |
| 03 | [03-watch-claude-follow-your-conventions.md](03-watch-claude-follow-your-conventions.md) | The core exercise: ask for an Axis camera integration and watch the conventions apply themselves |
| 04 | [04-capture-a-recurring-correction.md](04-capture-a-recurring-correction.md) | Saving a repeated correction back into `CLAUDE.md` (optional) |

## What You Will Have Learned

By the end you should be comfortable with the ideas the lesson calls its key
takeaways:

- `CLAUDE.md` gives Claude persistent, project specific context that loads into every
  conversation.
- Start with your stack, commands, and preferences, and bootstrap quickly with
  `/init`.
- Structure the file with a map of the codebase, your custom tools, and your standard
  workflows.
- Keep it concise, reference larger documents with the `@` symbol, and never commit
  secrets.
- Iterate. The best `CLAUDE.md` files capture the real friction in your workflow and
  grow with the codebase.

## A Note Before You Start

This repository ships in a deliberate starting state so that there is something for
you to build. Read the *Important Note on Intentional Flaws* section of the root
[README](../README.md) before you begin, so you can tell an intentional teaching
choice apart from a real problem. The short version: notice these choices and
understand them, do not try to fix them.
