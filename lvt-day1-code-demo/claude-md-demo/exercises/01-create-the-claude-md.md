# Exercise 01: Create the CLAUDE.md

`CLAUDE.md` is a Markdown file at the root of your project. Claude Code reads it
automatically at the start of every session and adds it to its context, so each
conversation begins already knowing your stack, commands, and conventions. Think of
it as an onboarding script for your codebase: write the project's rules once, and you
stop explaining them again every time.

In this exercise you look at the `CLAUDE.md` that already sits at the root of this
repository and understand why each section earns its place.

## What to Do

1. Confirm a working directory for the exercise. The lesson uses a fresh folder:

   ```bash
   mkdir -p ~/claude-md-lab && cd ~/claude-md-lab
   ```

   For this repository you can simply stay in the repository root, since the
   `CLAUDE.md` is already here.

2. Open the `CLAUDE.md` file at the project root and read it top to bottom.

   > You can generate a starter automatically with `/init`, which inspects your
   > project and drafts a file for you. For this demo the file is written directly so
   > the conventions are explicit.

3. Notice how the file is organised into short, scannable sections: a project
   summary, a map of the source tree, the commands you run, the code style rules, and
   a standard workflow.

## What to Observe

The `CLAUDE.md` in this repository reads like this:

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

Notice that this captures real friction for this codebase. TLS only endpoints, no
hardcoded credentials, and input validation are concrete rules this project cares
about, not generic advice.

## What to Look for in the Code

Match each rule in the file to the code it protects:

- The `Map` section lists `src/auth/`, `src/integrations/`, `src/stream/`, and
  `src/api/`. Open the source tree and confirm those directories exist. You will see
  that `src/stream/` is present in the map but has no code yet. That is part of the
  starting state, not a mistake to fix.
- The rule *"All camera/device endpoints must use TLS"* corresponds to the `https://`
  URL in `src/integrations/hikvisionCamera.ts`.
- The rule *"Never hardcode credentials or device tokens; read them from config"*
  corresponds to `loadDeviceConfig` in `src/api/config.ts`, which reads the token
  from the environment.
- The rule *"Validate any host or query value from a caller"* corresponds to the host
  pattern check in `src/integrations/hikvisionCamera.ts`.

## Learning Outcome

A good `CLAUDE.md` is short and specific. Every line documents a real convention that
the code already follows, which is exactly what lets Claude apply those conventions to
new work. You now know what a focused project memory file looks like and where each
rule shows up in the source.

Continue to [Exercise 02](02-start-a-session.md).
