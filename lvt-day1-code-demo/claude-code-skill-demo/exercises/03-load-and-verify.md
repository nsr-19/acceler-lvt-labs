# Exercise 3: Load and Verify

## Goal

Load the Skill you just wrote and confirm Claude Code has registered it.

## What to do

1. Claude Code loads Skills at startup, so restart your session:

   ```bash
   claude
   ```

2. Confirm the Skill is registered by asking:

   ```
   What skills do you have available?
   ```

## What to observe

- `surveillance-security-review` should appear in the list of available Skills.
- Claude keeps only the `name` and `description` of each Skill in context until a
  request matches. Seeing the Skill listed confirms it was discovered at startup, even
  though its full instructions are not loaded yet.

## If the Skill does not appear

- The file must be named exactly `SKILL.md`, with uppercase "SKILL" and lowercase
  "md", and it must sit inside a named folder rather than loose in `skills/`.
- Restart Claude Code after any change, because Skills load at startup.

## Learning outcome

You know that Skills are discovered when Claude Code starts, that only the `name` and
`description` are held in context until a request matches, and how to confirm a Skill
is registered.
