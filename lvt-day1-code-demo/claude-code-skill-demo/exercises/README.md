# Exercises: Build Your First Claude Code Skill

This folder turns the lesson "Build Your First Claude Code Skill" into a set of
short, hands on exercises. Each file is one step of the walkthrough. Work through
them in order. In about 10 to 15 minutes you will create a reusable security review
Skill, load it into Claude Code, and watch it surface planted vulnerabilities in a
sample camera module.

## How to use these exercises

1. Read the exercises in numerical order, starting with `01-prerequisites.md`.
2. Each guide tells you what to do, what to observe, and what the step is teaching.
3. Run every command and prompt exactly as written. Prompts you type into Claude
   Code are shown in fenced code blocks so you can copy them verbatim.
4. When a guide points you at the sample code, read it closely. The sample contains
   deliberate flaws that you are meant to notice and understand, not repair.

## The sample you will review

The repository ships one sample module, `cameraClient.ts`, in the project root. It
stands in for real camera client code and carries planted security issues. Exercise
04 walks you through reading it, and exercise 05 runs the Skill against it.

## Exercise index

| Step | File | What you build or do |
|------|------|----------------------|
| 1 | `01-prerequisites.md` | Confirm Claude Code is installed and set up a working directory. |
| 2 | `02-create-the-skill.md` | Author the `surveillance-security-review` Skill from a single `SKILL.md`. |
| 3 | `03-load-and-verify.md` | Restart Claude Code and confirm the Skill is registered. |
| 4 | `04-prepare-a-sample-for-review.md` | Study the sample camera module and its planted issues. |
| 5 | `05-run-the-review.md` | Ask Claude to review the sample and read the findings. |
| 6 | `06-restrict-to-read-only.md` | Constrain the Skill to read only tools with `allowed-tools`. |

## Key takeaways

- A Skill is a folder plus a `SKILL.md` file with `name` and `description` frontmatter.
- The `description` drives matching, so phrase it in the language people actually use.
- Skills load on demand only when a request matches, unlike `CLAUDE.md`, which loads
  in every conversation.
- The `allowed-tools` field constrains what a Skill can do while it is active.
- Define a standard once, and it applies automatically and consistently for everyone
  who has the Skill.

## Troubleshooting

| Symptom | Resolution |
|---|---|
| Skill not listed | The file must be named exactly `SKILL.md` (uppercase "SKILL", lowercase "md") and sit inside a named folder, not loose in `skills/`. Restart after any change. |
| Skill does not activate | The `description` does not overlap with how the request was phrased. Add the terms you would actually use. |
| Wrong Skill activates | Two descriptions are too similar. Make them more distinct. |
| Changes not taking effect | Restart Claude Code. Skills load at startup. |

## Where to go next

- Move the Skill into a repository's `.claude/skills/` folder and commit it, so the
  whole team receives it on clone.
- Add a `references/` file that holds your full secure coding standard and link to it
  from `SKILL.md`, so the larger document loads only when needed. This is progressive
  disclosure.
- Create a second Skill for another recurring task, such as an incident report format,
  release notes, or an ONVIF integration checklist.
