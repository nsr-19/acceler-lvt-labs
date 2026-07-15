# Exercise 2: Create the Skill

## Goal

Author the `surveillance-security-review` Skill from scratch. This is the heart of
the lesson. You define a review standard once, as a single file, so Claude can apply
it automatically whenever it fits.

## What to do

1. A Skill is a folder that contains a `SKILL.md` file. The folder name must match
   the Skill name. Create the folder:

   ```bash
   mkdir -p ~/.claude/skills/surveillance-security-review
   ```

2. Create `~/.claude/skills/surveillance-security-review/SKILL.md` with the following
   content:

   ```markdown
   ---
   name: surveillance-security-review
   description: Reviews TypeScript and JavaScript camera, video-stream,
     and device code for security issues. Use when reviewing surveillance
     code, RTSP/ONVIF/stream handling, camera config, or when the user asks
     to security-review a change to the camera platform (.ts / .js files).
   ---
   When reviewing surveillance or camera code (TypeScript or JavaScript),
   check for the issues below. Report each finding with file and line,
   severity (High / Medium / Low), and a recommended fix.

   ## Security checklist
   1. Hardcoded secrets — camera passwords, RTSP URLs containing credentials,
      API keys, or ONVIF device tokens committed in source or config.
   2. Unencrypted streams — plain `rtsp://` or `http://` for video or control
      where TLS (`rtsps://` / `https://`) is available.
   3. Missing authentication or default credentials (admin/admin) on any
      device or stream endpoint.
   4. Unvalidated input from a camera or device (frame metadata, ONVIF
      responses) used directly in paths, queries, or commands.
   5. Logging of sensitive data — credentials, tokens, or raw stream URLs
      written to logs.

   ## Output format
   Group findings by severity, highest first. Close with a one-line verdict:
   "Safe to merge" or "Blockers found — N High-severity issues".
   ```

## What to observe

- The file has two parts. The frontmatter between the two `---` lines carries the
  `name` and `description`. Everything below the second `---` is the instruction set
  Claude follows once the Skill is active.
- The `description` is the only field Claude reads when deciding whether to activate a
  Skill. It matches your request against the description, so the wording deliberately
  includes the terms an engineer would actually use, such as RTSP, review, and camera.

## What to look for in the code

- Notice how the checklist names concrete surveillance risks: credentials in RTSP
  URLs, plaintext `rtsp://`, default `admin/admin` logins, unvalidated device input,
  and secrets written to logs. These are the exact issues the Skill will flag in the
  next exercises.
- The `description` reads like plain language, not a formal spec. That is deliberate,
  because Claude matches your everyday phrasing against it.

## Learning outcome

You can create a Skill as a folder plus a `SKILL.md` file, and you understand that the
`name` identifies it, the `description` decides when it activates, and the body is the
instruction set Claude applies.
