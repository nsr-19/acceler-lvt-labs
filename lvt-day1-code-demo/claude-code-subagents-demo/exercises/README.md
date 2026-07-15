# Exercises: Build Multiple Claude Code Subagents

These exercises turn the lesson into a hands on lab. You will build two
complementary subagents for a small camera surveillance codebase, load them into
Claude Code, and delegate real tasks to each one. An optional third exercise adds
a documentation subagent that shows off a different pattern.

Everything here is derived from the lesson document `Subagents.docx` in the project
root. Work through the files in order. Each one is self contained and takes only a
few minutes.

## What you are building

By the end you will have created three project level subagents that live in
`.claude/agents/`:

| Subagent | Role | Tools |
| --- | --- | --- |
| `codebase-explorer` | Answers "where" and "how" questions about the code | Glob, Grep, Read |
| `integration-reviewer` | Reviews integration code with fresh eyes | Glob, Grep, Read |
| `integration-doc-writer` (optional) | Writes developer facing docs in a set voice | Glob, Grep, Read |

The project ships as a starting point. The `.claude/agents/` folder is intentionally
empty so that you build each subagent yourself while following the lesson. That is
the whole point of the lab.

## Before you begin

1. Install Claude Code and confirm the `claude` command runs in your terminal.
2. Open this project folder in Claude Code so the sample code and the empty
   `.claude/agents/` folder are visible to it.
3. Skim the two source files under `src/` so you know what your subagents will act on.

## How to use these exercises

- Do the files in numeric order. Later exercises assume the subagents from the
  earlier ones already exist.
- Each file states what to do, what to observe, what to look for in the code, and
  the learning outcome to take away.
- Run every example prompt in your own Claude Code session. The prompts are quoted
  exactly so you can copy them without changes.
- When an exercise points at a deliberate flaw in the sample code, your job is to
  notice it and understand why it matters. Do not fix it. The flaws are teaching
  material, described in the project README.

## The exercises

1. [Explore the sample codebase](01-explore-the-sample-codebase.md)
2. [Build the exploration subagent](02-build-the-exploration-subagent.md)
3. [Build the review subagent](03-build-the-review-subagent.md)
4. [Load and verify your subagents](04-load-and-verify.md)
5. [Delegate an exploration task](05-delegate-an-exploration-task.md)
6. [Delegate a review task](06-delegate-a-review-task.md)
7. [Add a documentation subagent (optional)](07-add-a-documentation-subagent.md)

## Key takeaways from the lesson

- A subagent runs in its own isolated context window. It receives a system prompt
  and a task description, does the work privately, and returns only a summary. The
  intermediate steps are discarded, so your main conversation stays focused on the
  result.
- Use different subagents for different jobs. An explorer answers research
  questions, a reviewer checks code with fresh eyes, and a writer produces docs in a
  set voice. Each one gets its own tools and its own system prompt.
- The `description` field does double duty. It controls when Claude reaches for the
  subagent, and it shapes the task prompt Claude writes when it delegates. Make it
  specific.
- A defined output format gives the subagent clear stopping points and returns a
  result the main thread can actually use.
- Grant each subagent only the tools its job requires. Keep exploration and review
  read only, and reserve edit or write access for subagents whose job is to change
  code.
- Subagents shine when exploration is separate from execution and you only need the
  answer. They hurt as expert personas that add nothing, as sequential pipelines
  where each step depends on the last, and as test runners where you actually need
  the full output to debug.

## Where the full reference lives

The complete lesson, including the exact configuration for each subagent, is in
`Subagents.docx` in the project root. Reach for it if you would rather write a
configuration by hand instead of letting Claude generate it.
