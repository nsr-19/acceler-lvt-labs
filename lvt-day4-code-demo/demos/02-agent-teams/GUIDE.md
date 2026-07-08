# Demo 2 — Agent Teams: True Parallel Execution

**Time:** ~25 min · **Deck tie-in:** Pattern 2 (Agent Teams), SubAgents-vs-Teams
table, Conductor → Orchestrator, Factory Model
**Docs:** https://code.claude.com/docs/en/agent-teams

---

## The concept in 60 seconds

An **agent team** is multiple *full Claude Code sessions* working together. Your
session becomes the **lead**; **teammates** are independent sessions with their
own context windows. They coordinate through a **shared task list** and message
each other directly through a **mailbox** — including messaging each *other*,
not just the lead.

This is the line in the deck made concrete:

|  | SubAgents (Demo 1) | Agent Teams (now) |
| --- | --- | --- |
| Context | Own window; results return to the caller | Own window; fully independent |
| Communication | Report back to the main agent only | Teammates message each other directly |
| Coordination | Main agent manages all work | Shared task list, self-coordination |
| Best for | Focused tasks where only the result matters | Work requiring discussion & collaboration |
| Token cost | Lower | **Higher — each teammate is a separate Claude instance** |

**When teams win:** research and review, new modules with clear ownership,
debugging with competing hypotheses, cross-layer changes.
**When they lose:** sequential work, same-file edits, tightly coupled tasks —
coordination overhead eats the gains. (This caveat is on the deck slide;
repeat it.)

> **Experimental feature.** Enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
> — already set in this repo's `.claude/settings.json` `env` block, so anyone
> who clones the repo gets it. Known limitations: `/resume` doesn't restore
> in-process teammates, one team per session, no nested teams, the lead stays
> the lead.

**What teammates know:** they load `CLAUDE.md`, MCP servers, and skills like
any session — but they do **not** inherit the lead's conversation history.
Everything they need must be in the spawn prompt. This single fact explains
most bad team runs.

---

## Pre-flight

- [ ] Fresh Claude session from repo root (`.claude/settings.json` env applies)
- [ ] `npm test` green
- [ ] Second terminal ready with `npm start` (for the live bug reproduction)
- [ ] Reset from Demo 1 if needed: `git reset --hard demo-start && git clean -fd`

Panel controls to narrate as you use them (in-process mode, the default):
**↑/↓** select a teammate · **Enter** open its transcript & type to message it ·
**Esc** interrupt it · **x** stop it · **Ctrl+T** toggle the shared task list.

---

## Run of show

### Act 1 — Parallel review: the safe on-ramp (7 min)

The docs' own advice: start teams with research and review, where parallelism
pays and nothing gets edited.

```
Spawn three teammates to review this codebase in parallel:
- "security" focuses on input validation and mass-assignment risks
- "correctness" focuses on logic errors and HTTP semantics in the routes
- "coverage" focuses on what the test suite does NOT cover
Name them exactly that. Have each report prioritized findings, then
synthesize the three reports into one ranked list.
```

**While they work:**

1. Press **Ctrl+T** — show the shared task list filling up. "The lead broke my
   request into tasks. Teammates claim them with file locking — no two grab the
   same one."
2. Arrow down to a teammate, press **Enter** — show its live transcript.
   "This is a *full session*. I can talk to it directly." Type into it:
   `Also check the store layer while you're at it.` Press Esc-equivalent
   (navigate back) and continue.
3. **Say:** "Naming teammates in the spawn prompt gives me handles I can use
   later — 'ask the security teammate to…'. And note what I packed into the
   spawn prompt: their focus areas. They don't see my conversation history."

**Expected outcome:** a synthesized, ranked list. The coverage teammate should
find the `completed: false` gap — perfect segue.

### Act 2 — The bug hunt: competing hypotheses (10 min)

**Reproduce the bug live first.** In the second terminal (server running):

```bash
curl -s -X POST localhost:3000/api/tasks -H 'content-type: application/json' -d '{"title":"Demo bug"}'
curl -s -X PATCH localhost:3000/api/tasks/1 -H 'content-type: application/json' -d '{"completed":true}'
curl -s -X PATCH localhost:3000/api/tasks/1 -H 'content-type: application/json' -d '{"completed":false}'
curl -s localhost:3000/api/tasks/1
```

The last PATCH returns **200 OK** — and the final GET shows `"completed": true`.
The API says yes and does nothing.

**Say:** "Three layers could plausibly do this: the route builds the update
payload, the service merges it, the store persists it — and the service merge
and the store cache both look suspicious on purpose. A single agent will find
one plausible story and stop — that's anchoring. So we make the investigation
adversarial."

```
Users report that un-completing a task doesn't stick: PATCH /api/tasks/1 with
{"completed": false} returns 200 but the task stays completed. Spawn three
teammates to investigate competing hypotheses:
- "route-theory" investigates src/routes/tasks.js
- "service-theory" investigates src/services/taskService.js
- "store-theory" investigates src/store/memoryStore.js and its read cache
Have them message each other to try to DISPROVE each other's theories, like a
scientific debate. Do not fix anything. Converge on a single root cause with
evidence.
```

**While they debate**, open teammate transcripts and narrate the
cross-messages. **Say:** "Watch them exonerate the red herrings — the store
cache *is* invalidated correctly, the service merge *is* correct. With
subagents this debate is impossible: workers can't talk to each other."

**Expected root cause:** `if (req.body[field])` in the PATCH handler drops all
falsy values — `false`, `""`, `0`. The fix is an explicit
`field in req.body` / `!== undefined` check.

**Teaching beat:** "And *why* did this ship? Look at `tests/tasks.test.js` —
it tests `completed: true`, never `completed: false`. Green suite, broken API.
Verification is the bottleneck, not generation — factory model slide."

### Act 3 — Fix under plan approval (6 min)

```
Spawn one teammate named "fixer" to fix the confirmed root cause in
src/routes/tasks.js and add a regression test covering completed:false and
empty-string updates. Require plan approval before they make any changes.
Only approve a plan that includes the regression test.
```

**Watch for:** fixer works in read-only plan mode → submits a plan → the lead
reviews it against your criterion → approves → implementation → suite green.

**Say:** "Plan approval is a quality gate. The teammate physically cannot edit
until the lead signs off, and I gave the lead the approval criterion in plain
language. In production you'd wire harder gates with hooks — `TaskCompleted`
can reject a task that doesn't pass tests, `TeammateIdle` can refuse to let a
teammate go idle with failing checks."

Verify on screen: `npm test` — the new regression test passes; re-run the curl
sequence — `completed` now flips to `false`.

**Close the loop — compound learning:**

```
Append a rule to the "Learned rules" section of CLAUDE.md: route handlers must
copy request fields with explicit undefined checks, never truthiness checks,
because falsy values (false, "", 0) are valid input.
```

**Say:** "Every future session — and every future teammate — now knows this.
That's the AGENTS.md pattern: the harness got permanently smarter from one bug."

### Shutdown (30 sec)

```
Ask all teammates to shut down.
```

Teammates can approve or reject shutdown; the team's directories clean up when
the session ends.

---

## Best practices to state before Q&A

- **3–5 teammates** is the sweet spot; **5–6 tasks per teammate** keeps everyone
  busy. Three focused teammates beat five scattered ones.
- **One file, one owner.** Two teammates editing one file = overwrites.
- **Spawn prompts carry the context.** No conversation history is inherited.
- **Monitor and steer.** Check transcripts, redirect early; an unattended team
  is a token furnace. Token cost scales linearly with teammates.
- If the lead starts doing the work itself: `Wait for your teammates to
  complete their tasks before proceeding.`

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| No teammates spawn | Env flag not loaded — restart Claude from repo root; verify `.claude/settings.json`. |
| Teammate row vanished | It's idle and hidden, not dead — message it by name and it reappears. |
| Permission prompts keep bubbling to the lead | Pre-approve commands in settings (this repo already allows `npm test`). |
| A task looks stuck | Task status can lag — check if the work is done, tell the lead to nudge the teammate. |
| Lead declares victory early | Tell it to keep going / wait for teammates. |

## Learner exercises

1. Re-run Act 2 with **one** general prompt ("find this bug") and no team.
   Compare which layer it anchors on and how confident it sounds.
2. Give the fixer a **subagent definition as its role**: "Spawn a teammate
   using the test-writer agent type…" — teams can reuse `.claude/agents/`
   definitions as teammate roles (tools + model apply; the body is appended to
   the teammate's system prompt).
3. Try split-pane mode: `claude --teammate-mode auto` inside tmux, and watch
   the whole team at once.
