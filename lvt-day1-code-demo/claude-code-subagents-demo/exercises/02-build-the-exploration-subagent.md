# Exercise 2: Build the Exploration Subagent

Your first subagent is a research assistant. Its job is to answer "where" and "how"
questions about the codebase and return precise file paths and line numbers, without
flooding your main conversation with every file it reads.

A subagent is a Markdown file with two parts: YAML frontmatter that configures it,
followed by a system prompt that instructs it. These subagents are project level,
which means they live in `.claude/agents/` and travel with the project.

## What to do

The project already has an empty `.claude/agents/` folder. If you ever need to
create it from scratch, the lesson uses this command:

```bash
mkdir -p .claude/agents
```

You have two ways to author the subagent.

### Option A: let Claude generate it (recommended)

Run the slash command:

```
/agents
```

Then choose **Create new agent**, pick **Project** as the scope, and let Claude
generate the configuration from a description. Give it a brief along these lines:

- Purpose: navigate the camera surveillance codebase and explain where a piece of
  logic lives and how it works, then return a concise answer.
- Behavior: search and read only. It must never modify code.
- Tools: Glob, Grep, Read.
- Model: sonnet. Color: blue.
- Output format: a short answer, a list of key locations with file path and line
  number, and a notes section for assumptions or gaps. It should cite locations
  rather than paste large blocks of code.

### Option B: write the file yourself

Create `.claude/agents/codebase-explorer.md`. The frontmatter should look like this:

```markdown
---
name: codebase-explorer
description: Explores the surveillance codebase to answer where and how
  questions about how something works, such as authentication, stream
  handling, device integration, and configuration. Use when the user needs
  to locate logic or understand a flow without reading every file
  themselves. Return precise file paths and line numbers.
tools: Glob, Grep, Read
model: sonnet
color: blue
---
```

Below the frontmatter, write a system prompt that tells the subagent it is a
codebase navigator, that it only reads and searches, and that it must answer in a
fixed format: an Answer line, a Key locations list with file path and line number
for each point, and a Notes line. The exact reference text is in `Subagents.docx` if
you want to match it word for word.

## What to look for in the code

- The `tools` line lists only `Glob, Grep, Read`. That makes the subagent read only.
  It can never alter the code it explores. This is the least privilege idea in
  practice: give a subagent only what its job requires.
- The `description` is specific. It names the kinds of questions the subagent
  handles and it ends with a clear instruction to return file paths and line
  numbers. That instruction does two jobs. It helps Claude decide when to reach for
  this subagent, and it shapes the task prompt Claude writes when it delegates.

## What to observe

You have not run anything yet. What you have produced is a configuration file. Notice
how small it is and how much of its behavior comes from two things: the tool list and
the description. Those two fields carry most of the weight.

## Learning outcome

You can create a read only research subagent, and you understand why its tool list
and its description matter more than its length. Next you will build a second
subagent with a very different job.
