# Claude Code Demo: Managing Context

A small Claude Code teaching demo. It gives you a compact camera surveillance codebase to explore while you practice keeping Claude's working memory lean with the `/context`, `/compact`, and `/clear` commands.

The demo takes about ten minutes. You fill up the context window while working in the codebase, inspect what is consuming space, and practice the three commands that control it. All sample code is TypeScript.

## Project Overview

This repository is a self contained teaching demo for Claude Code. It pairs a short lesson on context management with a small sample backend that ingests camera streams and exposes a device API. The code is deliberately minimal. Its job is to be interesting enough to read and explore, so that reading it fills the context window and gives you something real to manage.

In this demo you will:

- Check how much context you are using and what is taking up space.
- Do some work to fill the context, then summarize it to keep going.
- Clear the context completely before starting an unrelated task.
- Persist a durable fact so it survives across sessions.

## Important Note on Intentional Flaws

This is a teaching demo, so some of the code is intentionally simplified, minimal, or incomplete. That is by design.

- Do not fix, refactor, or improve the sample code as part of these exercises. Treat it as read only material to explore.
- If you find a comment that marks something as deliberate, for example a note that says a feature is intentionally not implemented yet, leave it exactly as written. Those markers are part of the lesson, and quietly fixing them would defeat the point of the demo.
- The value of the demo is in practicing the workflow, not in polishing the code.

## Prerequisites

- Claude Code installed and running. The `claude` command should work in your terminal.
- A terminal open in this project folder.
- Familiarity with reading TypeScript is helpful, since the sample code is TypeScript, but you do not need to run or build it.

This demo does not include a build or execution step for the TypeScript. The files exist to be read and explored, not to be compiled and run. Managing the context is the exercise.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ANI-IN/claude-code-context-management.git
cd claude-code-context-management
```

2. Launch Claude Code from the project folder:

```bash
claude
```

That is all you need. There are no packages to install for the exercises.

## Project Structure

```
.
├── CLAUDE.md                  Project instructions loaded into every Claude Code session
├── INSTRUCTIONS.md            The original single page walkthrough for the demo
├── Context Management.docx    The source lesson document
├── README.md                  This file
├── exercises/                 Step by step exercise guides derived from the lesson
│   ├── README.md              Index, how to use the guides, and key takeaways
│   ├── 01-check-your-starting-context.md
│   ├── 02-fill-the-context-with-real-work.md
│   ├── 03-compact-to-keep-going.md
│   ├── 04-clear-before-an-unrelated-task.md
│   ├── 05-persist-what-should-survive.md
│   └── 06-save-context-space.md
└── src/                       Sample camera surveillance backend, used as material to explore
    ├── api/
    │   ├── config.ts          Loads a device token from configuration, never hardcoded
    │   └── snapshot.ts        Public snapshot route; validates the host and enforces TLS
    ├── auth/
    │   └── deviceAuth.ts      Validates an ONVIF style device digest
    ├── integrations/
    │   └── onvifCamera.ts     Pulls a snapshot from a TLS ONVIF endpoint
    └── stream/
        ├── streamSession.ts   Manages the lifecycle of a single stream session
        └── transport.ts       Selects the stream transport, TLS only by policy
```

The three commands you will practice:

| Command | What it does |
|---|---|
| `/context` | Shows how full the window is and what is consuming the most space. |
| `/compact` | Summarizes the conversation so far and keeps the summary, freeing space while preserving memory of what you were doing. |
| `/clear` | Wipes the session entirely for a clean start. `CLAUDE.md` stays loaded. |

## Running the Demos

There is one guided demo, run entirely inside Claude Code. Launch `claude` in this folder, then follow these steps in order. Each step maps to a detailed guide in the `exercises/` folder.

1. **Check your starting context.** Run `/context` and note the baseline.
2. **Fill the context with real work.** Ask Claude to read `src/` and trace the snapshot flow, then run `/context` again and watch it climb.
3. **Compact to keep going.** Run `/compact`, then `/context` to confirm usage dropped.
4. **Clear before an unrelated task.** Run `/clear`, then `/context` to see the window back near baseline.
5. **Persist what should survive.** Ask Claude to add a durable note to `CLAUDE.md`.

For the exact prompts to send and what to look for at each step, work through the guides in `exercises/`, described next. The original single page version of this walkthrough is preserved in `INSTRUCTIONS.md`.

## Exercises

The `exercises/` folder turns the lesson into hands on practice, one guide per step. Start with the index:

- [exercises/README.md](exercises/README.md) explains how to use the guides and lists the key takeaways.

Then work through the guides in order:

1. [Check your starting context](exercises/01-check-your-starting-context.md)
2. [Fill the context with real work](exercises/02-fill-the-context-with-real-work.md)
3. [Compact to keep going](exercises/03-compact-to-keep-going.md)
4. [Clear before an unrelated task](exercises/04-clear-before-an-unrelated-task.md)
5. [Persist what should survive](exercises/05-persist-what-should-survive.md)
6. [Save context space](exercises/06-save-context-space.md)

Each guide tells you what to do, what to observe, what to look for in the code, and the intended learning outcome.

## Additional Notes

- **Persisting memory.** Anything Claude should remember across sessions belongs in `CLAUDE.md`, so it survives both compaction and clearing and reloads every session.
- **Saving space.** Be specific in your prompts, turn off MCP servers you do not need, and delegate lookups to subagents that report back a short answer.
- **Troubleshooting.**

| Symptom | Resolution |
|---|---|
| Context fills surprisingly fast | Run `/context` to find the consumer. Large file reads or many MCP tools are common causes. |
| Claude forgot something after compaction | It was not durable. Put it in `CLAUDE.md` and it will reload each session. |
| New task feels biased by old work | You compacted when you should have cleared. Use `/clear` when switching to unrelated work. |
