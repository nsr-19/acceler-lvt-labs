# Claude Code Subagents Demo

A small, hands on Claude Code demo that teaches how to build and use custom
**subagents**. You will create two complementary subagents for a tiny camera
surveillance codebase, one that explores the code to answer a question and one that
reviews code with fresh eyes, and see how each runs in its own isolated context and
returns only a summary. An optional third subagent shows a documentation pattern.

## Project Overview

This repository is a teaching demo for Claude Code, the sort you would work through
in roughly fifteen to twenty minutes. It is intentionally small so the ideas stay in
focus.

A subagent is a specialized assistant that Claude Code can delegate a task to. Each
subagent runs in its own context window, receives a system prompt and a task
description, does the work privately by reading and searching, and returns only a
summary. The intermediate steps are discarded, so your main conversation stays clean.

The demo ships with:

- A minimal ONVIF camera integration codebase under `src/` for the subagents to act
  on. One file is an existing authentication module, and one is a newly written
  integration module.
- The full lesson in `Subagents.docx`, covering the concepts and the walkthrough.
- A set of step by step exercises under `exercises/` that turn the lesson into a lab.

The subagents themselves are what you build while working through the exercises. The
`.claude/agents/` folder starts empty on purpose so that you create each subagent
yourself.

## Important Note on Intentional Flaws

Some code in this demo is flawed on purpose. The integration module
`src/integrations/onvifCamera.ts` contains several planted security weaknesses so
that the review subagent has something real to find. These flaws are teaching
material. **Do not fix them, and do not ask a subagent to fix them.**

The file documents its own planted issues. Read the marker comment block at the top
of `src/integrations/onvifCamera.ts`, which lists the deliberate problems:

```text
// Deliberate issues for the integration-reviewer to find:
//   1. Default "admin" credential fallback
//   2. Unencrypted http:// endpoint
//   3. Unvalidated host/query concatenated into the URL (injection / SSRF)
//   4. No authentication before pulling a frame
```

Treat that comment as a signpost. When an exercise leads you to one of these issues,
your task is to notice it and understand why it matters, not to repair it. If you fix
the code, the review exercise loses its point.

## Prerequisites

- Claude Code installed, with the `claude` command available in your terminal.
- Node.js if you want to run the source through a type or syntax check. It is not
  required to follow the demo.
- A terminal and a code editor.

You do not need any camera hardware. The codebase is a stand in that the subagents
read and reason about.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ANI-IN/claude-code-subagents-demo.git
   cd claude-code-subagents-demo
   ```

2. Open the project in Claude Code so it can see the source files and the
   `.claude/agents/` folder:

   ```bash
   claude
   ```

There is no build step. The point of the demo is to create subagents and delegate
tasks to them, not to run an application.

## Project Structure

```text
claude-code-subagents-demo/
├── README.md                         This file.
├── Subagents.docx                    The full lesson: concepts and walkthrough.
├── .gitignore                        Ignores operating system and editor noise.
├── .claude/
│   └── agents/                       Where your project level subagents live.
│       └── .gitkeep                  Placeholder. You add subagent files here.
├── src/
│   ├── auth/
│   │   └── deviceAuth.ts             Existing auth module. The explorer locates this.
│   └── integrations/
│       └── onvifCamera.ts            New integration module with deliberate flaws.
└── exercises/
    ├── README.md                     Index and how to use the exercises.
    ├── 01-explore-the-sample-codebase.md
    ├── 02-build-the-exploration-subagent.md
    ├── 03-build-the-review-subagent.md
    ├── 04-load-and-verify.md
    ├── 05-delegate-an-exploration-task.md
    ├── 06-delegate-a-review-task.md
    └── 07-add-a-documentation-subagent.md
```

## Running the Demos

The demos run inside Claude Code. Because this project is a starting point, you first
build the subagents and then delegate tasks to them. Each step below maps to an
exercise in `exercises/`, where you will find the full detail.

### Step 1: build the two subagents

Follow [exercise 2](exercises/02-build-the-exploration-subagent.md) to create the
`codebase-explorer` subagent, then [exercise 3](exercises/03-build-the-review-subagent.md)
to create the `integration-reviewer` subagent. The quickest path is the `/agents`
slash command, which lets Claude generate each configuration from a description.

### Step 2: load and verify

Restart Claude Code so it registers the new subagents, then list them:

```
/agents
```

Both `codebase-explorer` and `integration-reviewer` should appear, scoped to the
project. See [exercise 4](exercises/04-load-and-verify.md) for details.

### Demo A: delegate an exploration task

Ask the explorer where authentication is validated:

```
Use the codebase-explorer: where and how is ONVIF device authentication validated?
```

It should point you to `validateDigest` in `src/auth/deviceAuth.ts`. Notice that your
main conversation records only the question and the summary. See
[exercise 5](exercises/05-delegate-an-exploration-task.md).

### Demo B: delegate a review task

Hand the integration module to the reviewer:

```
Use the integration-reviewer to review src/integrations/onvifCamera.ts
```

It should return a structured review that flags the deliberate flaws and ends with an
Approval Status of "Requires changes". See
[exercise 6](exercises/06-delegate-a-review-task.md).

### Demo C: add a documentation subagent (optional)

Build the `integration-doc-writer` subagent, then document the module:

```
Use the integration-doc-writer to document src/integrations/onvifCamera.ts
```

See [exercise 7](exercises/07-add-a-documentation-subagent.md).

## Exercises

The `exercises/` folder is the guided path through this demo. Start with
[exercises/README.md](exercises/README.md), which explains how to use the guides and
lists the key takeaways. Then work through the numbered files in order:

1. Explore the sample codebase.
2. Build the exploration subagent.
3. Build the review subagent.
4. Load and verify your subagents.
5. Delegate an exploration task.
6. Delegate a review task.
7. Add a documentation subagent (optional).

Each guide states what to do, what to observe, what to look for in the code, and the
learning outcome. Every example prompt is quoted exactly so you can copy it without
changes.

## Additional Notes

- **Different jobs deserve different subagents.** An explorer for research, a
  reviewer for code review, and a writer for docs. Each one gets its own tools and
  its own system prompt.
- **Tool access is least privilege.** All three subagents here are read only, with
  just Glob, Grep, and Read. Reserve edit or write access for subagents whose job is
  to change code.
- **A defined output format matters.** It gives a subagent clear stopping points and
  returns a result the main thread can use. The reviewer's Obstacles Encountered
  section is a good example: it surfaces workarounds and quirks so they are not
  rediscovered later.
- **Know when not to use a subagent.** They hurt as expert personas that add no real
  capability, as sequential pipelines where each step depends on the last, and as
  test runners where you actually need the full output to debug. The full lesson in
  `Subagents.docx` covers these anti patterns in detail.
- **Skills versus subagents.** A skill runs inline in your main conversation and is
  best for injecting a standard or checklist into the current task. A subagent runs
  in a separate context and is best for delegating self contained work and getting a
  summary back.
