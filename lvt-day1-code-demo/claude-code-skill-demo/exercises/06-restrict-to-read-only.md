# Exercise 6: Restrict the Skill to Read Only (Optional)

## Goal

Constrain the Skill so it can read and search files but never modify them, which is
the right posture for any security sensitive or audit workflow.

## What to do

1. A review Skill should never change code. The `allowed-tools` field limits what
   Claude may do while the Skill is active. Update the frontmatter of
   `~/.claude/skills/surveillance-security-review/SKILL.md`:

   ```markdown
   ---
   name: surveillance-security-review
   description: Reviews TypeScript and JavaScript camera, video-stream,
     and device code for security issues. Use when reviewing surveillance
     code, RTSP/ONVIF/stream handling, camera config, or when the user asks
     to security-review a change to the camera platform (.ts / .js files).
   allowed-tools: Read, Grep, Glob
   ---
   ```

2. Restart Claude Code so the change takes effect.

## What to observe

- While this Skill is active, Claude can read and search files but cannot write or
  edit them. That makes accidental edits during a review impossible by construction,
  rather than by asking politely.
- Omit `allowed-tools` entirely and the Skill restricts nothing, falling back to
  Claude's normal permission model. Adding it is how you opt into least privilege.

## What to look for

- Only the frontmatter changed. The instruction set below the second `---` is exactly
  the same as before. A single field turned the Skill into a read only reviewer.

## Learning outcome

You know how to use `allowed-tools` to scope a Skill down to read only access, and why
that is the correct default for review and audit work.
