# Demo 3 — Dynamic Workflows (+ Plugins & Worktrees bonus)

**Time:** ~15 min · **Deck tie-in:** "When to use Dynamic Workflows" (who holds
the plan), Plugins in Claude Code, Git worktrees (5 Patterns slide)
**Docs:** https://code.claude.com/docs/en/workflows

---

## The concept in 60 seconds

A **dynamic workflow** is a JavaScript script that orchestrates subagents at
scale. You describe the task; **Claude writes the script**; a runtime executes
it in the background while your session stays free. Intermediate results live in
*script variables*, not in anyone's context window — only the final answer
comes back to you.

The deck's framing — *the difference is who holds the plan*:

|  | SubAgents | Agent Teams | **Workflows** |
| --- | --- | --- | --- |
| Who decides what runs next | Claude, turn by turn | The lead, turn by turn | **The script** |
| Where intermediate results live | Claude's context | Shared task list | **Script variables** |
| What's repeatable | The worker definition | The team definition | **The orchestration itself** |
| Scale | A few tasks per turn | A handful of peers | **Dozens–hundreds of agents per run** |

Reach for a workflow when the task outgrows one conversation's coordination —
codebase-wide audits, 500-file migrations, cross-checked research — or when you
want the orchestration saved and rerun as a command.

> **Requirements:** Claude Code v2.1.154+, any paid plan (on Pro: enable via
> the *Dynamic workflows* row in `/config`). Guardrails: max **16 concurrent
> agents**, **1,000 agents per run**; workflow-spawned subagents always run in
> `acceptEdits` mode and inherit your tool allowlist.

---

## Pre-flight

- [ ] Reset if you fixed things in Demo 2 and want the audit to find flaws:
      `git reset --hard demo-start && git clean -fd` (or keep the fix — the
      users routes are still full of gaps either way)
- [ ] `claude --version` ≥ 2.1.154; workflows enabled

---

## Run of show

### Step 1 — Trigger a workflow (1 min)

**Say:** "Two ways to trigger one: just ask in plain words — 'use a workflow' —
or include the keyword `ultracode`. There's also `/effort ultracode`, which
makes Claude plan a workflow for *every* substantive task in the session.
We'll ask explicitly."

```
use a workflow to audit every route handler under src/routes/ for missing
input validation and missing error handling, and adversarially verify each
finding before reporting it
```

### Step 2 — The approval gate (1 min)

Claude Code shows the planned phases and asks for approval. Walk the options:
**Yes, run it** · **Yes and don't ask again for this workflow here** ·
**View raw script** · **No**. Pick *View raw script* first — 10 seconds of
"this is real JavaScript, not magic" — then run it.

**Say:** "Note the trust model: I approve the *launch*. The agents it spawns
run under `acceptEdits` with my existing tool allowlist — file edits
auto-approve, but a shell command outside my allowlist still prompts me."

### Step 3 — Watch the run (3 min)

```
/workflows
```

Select the run, press **Enter**. Narrate the progress view: phases with agent
counts, token totals, elapsed time. Drill into a phase (**Enter/→**), then into
one agent to show its prompt and tool calls. Keys worth showing: **f** filter
agents by status · **p** pause/resume · **x** stop · **s** save.

**Say:** "A fan-out of auditors, then a verification phase where *different*
agents try to knock down each finding before it reaches me. Adversarial
verification as a repeatable pattern — that's what putting the plan in code
buys you: not just more agents, a *quality structure*."

**Expected findings:** `POST /api/users` accepts anything (no validation),
`GET /api/users/:id` returns 200 with null instead of 404, `DELETE` ignores
missing ids — and, if you didn't fix it in Demo 2, the PATCH truthiness filter.

### Step 4 — Read the script (2 min)

```
Show me the workflow script you just ran — print the file path and the key part.
```

Every run writes its script under `~/.claude/projects/`. Point at the shape:

```javascript
export const meta = { name: 'audit-routes', description: '…' }

const found = await agent('List every route file under src/routes/…', { schema: … })
const audits = await pipeline(found.files, file =>
  agent(`Audit ${file} for missing validation…`, { label: file }))
return audits.filter(Boolean)
```

**Say:** "Plain JavaScript with top-level await. `agent()` spawns one subagent;
`pipeline()` runs one per item. The loop, the branching, the intermediate
results — all live *here*, not in my context window. My context receives one
thing: the final report."

### Step 5 — Save it, rerun it (2 min)

In `/workflows`, select the run and press **s**. Save as `route-audit` to the
**project** location (`.claude/workflows/` — Tab toggles project vs personal).

**Say:** "It's now a command: `/route-audit`, for me and for everyone who
clones this repo. Saved workflows also take input — `Run /route-audit on
src/routes/users.js only` passes structured `args` into the script. The
orchestration itself became a versioned team asset — the deck's 'harness as
infrastructure' line, literally."

### Step 6 — Stretch (optional, if time): the fix loop

```
use a workflow to add the missing input validation the audit found, working on
each route file in its own isolated copy, then run npm test and keep fixing
until the suite passes or two rounds in a row make no progress
```

**Say:** "Two patterns in one: isolated per-file copies so parallel edits can't
collide, and a *convergence loop* — fix, verify, repeat, with a stopping
condition. 'Keep going until the check passes' is something a script does
reliably and a conversation does expensively." Mention cost hygiene: run big
workflows on a small slice first; `/workflows` shows per-agent tokens; **x**
stops without losing completed work.

Also mention the bundled one: `/deep-research <question>` — same machinery,
pointed at web sources with claim cross-checking.

---

## Bonus A — Plugins (2 min, talk-only)

Deck slide: *Plugins in Claude Code* → https://code.claude.com/docs/en/discover-plugins

**Say:** "Everything we built today by hand — subagent definitions, skills,
workflows, hooks — can be packaged and installed as a **plugin**. Plugin
subagents show up in the @-mention typeahead under a scoped name like
`my-plugin:code-reviewer`. So the arc of the day is: write an agent file →
check it into the repo → ship it as a plugin to your whole org. Same artifact,
growing blast radius."

## Bonus B — Worktrees & background sessions (2 min, talk-only or live)

Deck slide: *Git worktrees for isolation* (5 Patterns) → https://code.claude.com/docs/en/worktrees

```bash
claude --worktree feature-auth     # isolated checkout at .claude/worktrees/feature-auth,
                                   # new branch worktree-feature-auth
```

- Two terminals, two worktrees, two Claudes — parallel work with zero file
  collisions, coordinated by *you* instead of a lead agent.
- `.worktreeinclude` (in this repo) copies gitignored files like `.env` into
  each fresh worktree.
- Subagents can get one automatically: `isolation: worktree` in frontmatter.
- On exit, Claude cleans up unchanged worktrees and prompts about dirty ones.

And the last rung: `claude agents` (agent view, research preview) — dispatch
background sessions from one screen, peek with Space, attach with Enter;
`claude --bg "fix the flaky test"` from any shell. That's the "fleet dashboard"
for the orchestrator role the deck describes.

---

## Wrap-up line for the whole demo block

"Same primitive all day — an agent with a prompt and tools. We scaled it three
ways: subagents give you disposable specialists inside one conversation; teams
give the specialists their own sessions and let them argue; workflows take the
plan out of the conversation entirely and make it a script you version and
rerun. Pick by asking one question: *who should hold the plan?*"

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `ultracode` / workflow request does nothing | Version < 2.1.154, free plan, or disabled — check `/config` → Dynamic workflows. |
| Run seems stalled | `/workflows` → drill in; an agent may be waiting on a permission prompt for a command outside your allowlist. |
| Costs climbing | **p** to pause, **x** to stop (completed agents' results are kept); rerun on a smaller slice. |
| Saved workflow doesn't appear as `/route-audit` | Confirm it saved to `.claude/workflows/` (project) and start a fresh prompt — check `/` autocomplete. |

## Learner exercises

1. Rerun `/route-audit` after fixing one route. Does the finding disappear?
2. Open the saved script in `.claude/workflows/route-audit` and ask Claude to
   walk you through every line.
3. Write your own: `use a workflow to find every place the store is accessed
   directly from a route, bypassing the service layer` — then save it as
   `/layer-check`.
4. Try `/deep-research` on a real question from your own work.
