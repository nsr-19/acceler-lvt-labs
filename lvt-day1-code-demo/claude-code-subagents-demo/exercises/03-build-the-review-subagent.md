# Exercise 3: Build the Review Subagent

Your second subagent reviews code with fresh eyes. Claude reviews code more
effectively when it sees the work as someone else's, in a clean context, rather than
as something it just helped write. A review subagent gives you exactly that fresh
perspective, and it lets you encode your review standards in one place.

## What to do

You will create `.claude/agents/integration-reviewer.md`.

### Option A: let Claude generate it (recommended)

Run:

```
/agents
```

Choose **Create new agent**, pick **Project** scope, and describe the subagent:

- Purpose: a security and quality reviewer for a camera surveillance platform that
  examines TypeScript and JavaScript with fresh eyes and reports issues.
- Behavior: read and analyze only. It must not modify code.
- Tools: Glob, Grep, Read.
- Model: sonnet. Color: purple.
- Focus areas: hardcoded or default credentials, unencrypted endpoints, unvalidated
  input used to build URLs or paths or commands, missing authentication before a
  device or stream is accessed, and sensitive data written to logs.
- Output format: a numbered report with Summary, Critical Issues, Major Issues,
  Minor Issues, an Approval Status of either "Safe to merge" or "Requires changes",
  and an Obstacles Encountered section.

One phrase in the description is worth adding on purpose: **you must tell the agent
precisely which files to review**. When that instruction is present, Claude writes a
sharper task prompt that names the actual files, instead of leaving the subagent to
guess which files matter.

### Option B: write the file yourself

Create the file with frontmatter like this:

```markdown
---
name: integration-reviewer
description: Reviews TypeScript and JavaScript camera and device integration
  code for security and correctness. Use after writing or modifying
  integration, stream, or device code. You must tell the agent precisely
  which files to review.
tools: Glob, Grep, Read
model: sonnet
color: purple
---
```

Then write a system prompt that lists the focus areas above and defines this output
format:

```
1. Summary: what you reviewed and an overall assessment.
2. Critical Issues: security or logic errors that must be fixed now.
3. Major Issues: quality, architecture, or performance concerns.
4. Minor Issues: style, documentation, or optimization notes.
5. Approval Status: "Safe to merge" or "Requires changes".
6. Obstacles Encountered: any setup issues or quirks discovered during the review.
```

The exact reference text is in `Subagents.docx` if you want to match it word for word.

## What to look for in the code

Two design choices carry this subagent:

- **The tools are read only.** The reviewer reads and searches the files you point it
  at, but it has no edit or write access. It reviews, it does not change.
- **The output format is explicit.** Numbered sections give the subagent clear
  stopping points and return a result the main thread can use. The Obstacles
  Encountered section surfaces anything unexpected, such as a setup quirk or a
  workaround, so it is not rediscovered later.

## What to observe

Compare this configuration with the explorer from Exercise 2. The tool lists are the
same, yet the two subagents do very different jobs. The difference lives entirely in
the description and the system prompt. That is the lesson: behavior comes from
instructions, not from tools alone.

## Learning outcome

You can create a read only review subagent with a structured output format, and you
understand how a specific description steers both when it runs and what it is told to
do.
