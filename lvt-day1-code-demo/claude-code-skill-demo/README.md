# Claude Code Skill Demo

A small, self contained Claude Code teaching demo. It walks you through building your
first Claude Code Skill: a reusable `surveillance-security-review` Skill that activates
automatically whenever you ask Claude to review camera or streaming code, and surfaces
a common surveillance vulnerability, hardcoded camera credentials.

## Project Overview

This repository is a hands on lesson, not a production application. In roughly 10 to
15 minutes you will:

- Create a reusable security review Skill from a single `SKILL.md` file.
- Load it into Claude Code and run it against a sample module with known
  vulnerabilities.
- Restrict the Skill to read only access for safe, repeatable reviews.

The examples use TypeScript, and the Skill applies to both TypeScript and JavaScript.
The lesson is captured in two places: `INSTRUCTIONS.md` holds the Markdown walkthrough,
and `Skills.docx` holds the full Skills guide together with the demo. The `exercises/`
folder breaks the same lesson into short, ordered guides you can follow step by step.

## Important Note on Intentional Flaws

The sample module `cameraClient.ts` contains deliberate security flaws. They are there
on purpose so the Skill has something concrete to detect. **Do not fix them.** If you
repair the sample, the review has nothing to find and the lesson stops working.

The file announces this itself. Its header comment is the marker to look for:

```typescript
// Sample module for the skill demo. Contains three deliberate issues:
//   1. Hardcoded credentials in the RTSP URL
//   2. Unencrypted rtsp:// stream
//   3. The stream URL (with credentials) written to logs
```

Treat any planted flaw or marker comment in this repository as fixed teaching
material. The exercises guide you to notice and understand each flaw rather than
correct it.

## Prerequisites

- Claude Code installed and running, so the `claude` command is available in your
  terminal.
- Git, to clone the repository.
- Optional: [Deno](https://deno.com) or Node.js if you want to type check the sample
  module locally.

## Installation

Clone the repository and move into it:

```bash
git clone https://github.com/ANI-IN/claude-code-skill-demo.git
cd claude-code-skill-demo
```

No package installation or build step is required. The demo is plain files.

## Project Structure

```text
claude-code-skill-demo/
├── cameraClient.ts     # Sample camera module with planted vulnerabilities (the review target)
├── INSTRUCTIONS.md     # The lesson in Markdown: Build Your First Claude Code Skill
├── Skills.docx         # The full Skills guide plus the demo walkthrough (source lesson)
├── exercises/          # Step by step guides derived from the lesson
│   ├── README.md                          # How to use the exercises and the key takeaways
│   ├── 01-prerequisites.md                # Set up Claude Code and a working directory
│   ├── 02-create-the-skill.md             # Author the surveillance-security-review Skill
│   ├── 03-load-and-verify.md              # Restart Claude Code and confirm the Skill loads
│   ├── 04-prepare-a-sample-for-review.md  # Study the sample and its planted issues
│   ├── 05-run-the-review.md               # Run the review and read the findings
│   └── 06-restrict-to-read-only.md        # Limit the Skill with allowed-tools
├── .gitignore          # Ignores OS and editor noise
└── README.md           # This file
```

## Running the Demos

### Demo: build the Skill and review the sample

This is the main walkthrough. Follow it directly, or work through the matching files
in `exercises/`.

1. Create the Skill folder and its `SKILL.md`:

   ```bash
   mkdir -p ~/.claude/skills/surveillance-security-review
   ```

   Then add the `SKILL.md` content shown in `exercises/02-create-the-skill.md` (or in
   `INSTRUCTIONS.md`).

2. Restart Claude Code so it discovers the new Skill:

   ```bash
   claude
   ```

3. Confirm the Skill is registered:

   ```
   What skills do you have available?
   ```

4. Ask Claude to review the sample module from the repository root:

   ```
   Security-review cameraClient.ts
   ```

   Claude confirms it is loading `surveillance-security-review`, applies the checklist,
   and returns findings grouped by severity, each with a recommended fix and a closing
   verdict.

5. Optional: restrict the Skill to read only tools by adding `allowed-tools` to the
   frontmatter, as shown in `exercises/06-restrict-to-read-only.md`, then restart
   Claude Code.

### Optional: type check the sample locally

The sample is a module rather than a runnable program, but you can confirm it parses:

```bash
deno check cameraClient.ts
```

## Exercises

The `exercises/` folder contains a short guide for each step of the lesson, plus an
index at `exercises/README.md`. Start there. It explains how to use the guides and
lists the lesson's key takeaways. Each guide tells you what to do, what to observe,
what to look for in the code, and the intended learning outcome, and it points out the
planted flaws so you learn to recognize them.

Recommended order:

1. `exercises/01-prerequisites.md`
2. `exercises/02-create-the-skill.md`
3. `exercises/03-load-and-verify.md`
4. `exercises/04-prepare-a-sample-for-review.md`
5. `exercises/05-run-the-review.md`
6. `exercises/06-restrict-to-read-only.md`

## Additional Notes

- This exercise builds a personal Skill under `~/.claude/skills`, which follows you
  across every project. To share a Skill with a team instead, place it in a
  repository's `.claude/skills/` folder and commit it, so everyone receives it on
  clone.
- The `description` field is what Claude matches against, so phrase it in the language
  people actually use. If a Skill does not trigger, add the terms you would really
  type.
- For larger Skills, keep `SKILL.md` short and move detailed material into separate
  reference files that Claude loads only when needed. This is called progressive
  disclosure.
- The `allowed-tools` field is how you scope a Skill down to least privilege, such as
  read only access for review and audit work.
