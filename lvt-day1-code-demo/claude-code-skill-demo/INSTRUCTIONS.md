# Build Your First Claude Code Skill

A hands-on walkthrough for creating, loading, and testing a reusable Skill end-to-end. In roughly 10–15 minutes you will build a security-review Skill that activates automatically whenever you ask Claude to review camera or streaming code, and watch it surface a common surveillance vulnerability: hardcoded camera credentials.

The examples use TypeScript, and the Skill applies to both TypeScript and JavaScript.

In this demo, we will:

- Create a reusable security-review Skill from a single `SKILL.md` file.
- Load it into Claude Code and run it against a sample with known vulnerabilities.
- Restrict the Skill to read-only access for safe, repeatable reviews.

---

## Prerequisites

- Claude Code installed and running (`claude` is available in your terminal).
- A working directory for the exercise.

```bash
mkdir -p ~/skill-lab && cd ~/skill-lab
```

This exercise builds a **personal** Skill. It lives in your home directory and is available across all of your projects.

---

## Step 1 — Create the Skill

A Skill is a folder containing a `SKILL.md` file. The folder name must match the Skill name.

```bash
mkdir -p ~/.claude/skills/surveillance-security-review
```

Create `~/.claude/skills/surveillance-security-review/SKILL.md` with the following content:

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

The `description` is the only field Claude reads when deciding whether to activate a Skill. It matches your request against the description, so the wording deliberately includes the terms an engineer would actually use — *RTSP*, *review*, *camera*. Everything below the second `---` is the instruction set Claude follows once the Skill is active.

---

## Step 2 — Load and verify

Claude Code loads Skills at startup. Restart your session:

```bash
claude
```

Confirm the Skill is registered:

```
What skills do you have available?
```

`surveillance-security-review` should appear in the list. If it does not, see **Troubleshooting**.

---

## Step 3 — Prepare a sample for review

Create `cameraClient.ts` in your working directory. It contains three deliberate vulnerabilities for the Skill to detect.

```typescript
// connect to the building's front-door camera
const RTSP_URL = "rtsp://admin:admin123@10.0.0.42:554/stream1";
const ONVIF_TOKEN = "device-tok-9f3a-PROD";

export async function connect(): Promise<Response> {
  console.log(`Connecting to ${RTSP_URL}`); // log the stream URL
  return fetch(RTSP_URL);
}
```

The planted issues are hardcoded credentials, an unencrypted stream, and a credential exposed in logs.

---

## Step 4 — Run the review

Request a review using natural phrasing:

```
Security-review cameraClient.ts
```

Claude detects the match, prompts you to confirm loading `surveillance-security-review`, then applies the checklist. The output groups findings by severity — the hardcoded `admin:admin123`, the plaintext `rtsp://`, and the logged stream URL — each with a recommended fix and a closing verdict.

The standard is now defined once. Every engineer with this Skill receives the same review, in the same format, on every request — without anyone needing to recall the checklist.

---

## Step 5 — Restrict the Skill to read-only (optional)

A review Skill should never modify code. The `allowed-tools` field limits what Claude may do while the Skill is active. Update the frontmatter:

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

Restart Claude Code. While this Skill is active, Claude can read and search files but cannot write or edit them — appropriate for any security-sensitive or audit workflow.

---

## Summary

- A Skill is a folder plus a `SKILL.md` file with `name` and `description` frontmatter.
- The `description` drives matching; phrase it in the language people actually use.
- Skills load on demand only when a request matches, unlike `CLAUDE.md`, which loads in every conversation.
- `allowed-tools` constrains what a Skill can do while active.
- Define a standard once, and it applies automatically and consistently for everyone who has the Skill.

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Skill not listed | The file must be named exactly `SKILL.md` (uppercase "SKILL", lowercase "md") and sit inside a named folder, not loose in `skills/`. Restart after any change. |
| Skill does not activate | The `description` does not overlap with how the request was phrased. Add the terms you would actually use. |
| Wrong Skill activates | Two descriptions are too similar. Make them more distinct. |
| Changes not taking effect | Restart Claude Code; Skills load at startup. |

---

## Next steps

- Move the Skill into a repository's `.claude/skills/` and commit it, so the whole team receives it on clone.
- Add a `references/` file containing your full secure-coding standard and link to it from `SKILL.md`, so the larger document loads only when needed (progressive disclosure).
- Create a second Skill for another recurring task — incident report format, release notes, or an ONVIF integration checklist.
