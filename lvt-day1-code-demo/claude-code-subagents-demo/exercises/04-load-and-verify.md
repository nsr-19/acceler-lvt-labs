# Exercise 4: Load and Verify Your Subagents

Claude Code registers subagents when it starts. After you add or change a subagent
file, you reload so it picks up the new configuration.

## What to do

Restart Claude Code so it registers both subagents:

```bash
claude
```

Then confirm they are available:

```
/agents
```

Both `codebase-explorer` and `integration-reviewer` should appear in the list,
scoped to the project.

## What to look for in the code

If a subagent does not show up, open its file under `.claude/agents/` and check the
frontmatter. The file must live in `.claude/agents/`, and the YAML block at the top
must be valid. A common mistake is a broken `description` that spans lines without
correct indentation. Fix the frontmatter and restart.

## What to observe

- Subagents are project level, so anyone who opens this project sees the same two
  subagents. That is why they belong in `.claude/agents/` rather than in a personal
  location.
- The list shows the color you set for each one. Color is a small touch that helps
  you tell which subagent is active when several are running.

## Troubleshooting

| Symptom | Resolution |
| --- | --- |
| A subagent is not listed | The file must be in `.claude/agents/` with valid YAML frontmatter. Restart after any change. |
| The wrong subagent runs later | Two descriptions overlap. Make them distinct so each one clearly owns its task. |

## Learning outcome

You know how to load subagents and confirm they are registered, and you can diagnose
the most common reason a subagent fails to appear.
