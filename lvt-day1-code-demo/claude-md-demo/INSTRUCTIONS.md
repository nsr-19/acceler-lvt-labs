# Create a CLAUDE.md for Your Project

A short hands-on walkthrough for giving Claude Code persistent memory of your project. In about 10 minutes you will create a `CLAUDE.md` file for a camera-surveillance codebase, then watch Claude follow your conventions automatically — without being reminded.

All examples use TypeScript.

In this demo, we will:

- Create a `CLAUDE.md` that describes our project, commands, and code style.
- Start a session and let Claude load that context on its own.
- Ask Claude to write code and see it follow our conventions with no reminders.

---

## Background: what CLAUDE.md does

`CLAUDE.md` is a Markdown file at the root of your project. Claude Code reads it automatically at the start of every session and adds it to its context — so each conversation begins already knowing your stack, commands, and conventions. It is an onboarding script for your codebase: write the project's rules once, and you stop re-explaining them every time.

---

## Prerequisites

- Claude Code installed and running (`claude` is available in your terminal).
- A working directory for the exercise.

```bash
mkdir -p ~/claude-md-lab && cd ~/claude-md-lab
```

---

## Step 1 — Create the CLAUDE.md

You can generate a starter automatically with `/init`, which inspects your project and drafts a file for you. For this demo we will write a short one directly so the conventions are explicit.

Create `CLAUDE.md` in the project root:

```markdown
# Project
Camera-surveillance platform. TypeScript backend that ingests RTSP/ONVIF
camera streams and exposes a device API.

# Map
- src/auth/         device authentication (ONVIF digest validation)
- src/integrations/ per-camera integration modules
- src/stream/       stream ingestion and transport
- src/api/          public device API routes

# Commands
- Dev server: `npm run dev`
- Run tests:  `npm test`
- Lint:       `npm run lint`

# Code Style
- 2-space indentation, named exports only.
- All camera/device endpoints must use TLS (rtsps:// or https://),
  never plain rtsp:// or http://.
- Never hardcode credentials or device tokens; read them from config.
- Validate any host or query value from a caller before using it in a URL.

# Workflow
For new integrations: explore the existing module in src/integrations/
first, then plan, then implement, then add a test.
```

Notice this captures real friction for this codebase — TLS-only endpoints, no hardcoded credentials, input validation — not generic advice.

---

## Step 2 — Start a session

Open Claude Code in the project so it loads the file:

```bash
claude
```

You can confirm it was picked up by asking:

```
What do you know about this project?
```

Claude should summarize the stack, directory map, and conventions straight from your `CLAUDE.md` — without you pasting anything.

---

## Step 3 — Watch it follow your conventions

Now ask for a task without restating any rules:

```
Add a new integration module for an Axis camera in src/integrations/
```

Claude applies what the file already told it: it uses a TLS endpoint rather than plain `http://`, reads credentials from config instead of hardcoding them, validates caller input, uses named exports and 2-space indentation, and follows the explore-then-plan-then-implement workflow. None of that was in your request — it came from `CLAUDE.md`.

---

## Step 4 — Capture a recurring correction (optional)

When you find yourself correcting Claude on the same thing, save it to the file so it sticks for next time. Either type a line starting with `#` to append it, or just ask:

```
Add a note to CLAUDE.md: log stream URLs without their query string,
since the query can contain a token.
```

Claude updates `CLAUDE.md`, and from the next session that rule is part of its context automatically.

---

## Summary

- `CLAUDE.md` lives at the project root and loads into every session automatically.
- Fill it with a project map, your commands, your code style, and standard workflows.
- Bootstrap quickly with `/init`, then refine — capture only the rules that reflect real friction.
- Keep it concise; every line costs context. Reference larger docs with `@filename` instead of pasting them.
- Never include secrets — treat it as documentation that could be shared, since it becomes part of Claude's context.

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Claude ignores the conventions | Confirm the file is named exactly `CLAUDE.md` and sits in the directory where you launched `claude`. |
| File is getting long and unfocused | Move detailed sections into separate Markdown files and reference them with `@`. |
| A rule keeps being missed | Make it more specific and concrete; vague guidance is easy to overlook. |

---

## Next steps

- Commit `CLAUDE.md` so the whole team shares the same conventions.
- Add a personal user-level memory file for preferences that apply across all your projects.
- Pair it with subagents for isolated phases (such as a security review) and `/clear` to reset context between unrelated tasks while keeping `CLAUDE.md` loaded.
