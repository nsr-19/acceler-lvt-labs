# Demo 1 — SubAgents: Focused Delegation

**Time:** ~15 min · **Deck tie-in:** Pattern 1 (SubAgents), Intelligent Model Routing
**Docs:** https://code.claude.com/docs/en/sub-agents

---

## The concept in 60 seconds

A **subagent** is a worker Claude spawns *inside your session*, with its own
context window, its own system prompt, and its own tool permissions. It does the
noisy work — searching, reading, running tests — in its own context and returns
only a summary to your main conversation.

Why that matters (say this out loud):

1. **Context preservation** — your main window is a scarce, billable resource.
   A subagent absorbs 50 files of exploration and hands back three sentences.
2. **Enforced constraints** — a reviewer that *cannot* edit files, because its
   `tools` list doesn't include Edit. The harness enforces it, not a polite request.
3. **Model routing** — route routine work to a cheap, fast model (`model: haiku`)
   and keep the frontier model for hard thinking. This is the Economies section
   of the deck, running live.
4. **Reuse** — a definition checked into `.claude/agents/` is a team asset.

Claude decides *when* to delegate based on each subagent's `description` field —
which is why every description in this repo says things like "use proactively".

**Built-ins you get for free:** `Explore` (fast, read-only codebase search),
`Plan` (research during plan mode), `general-purpose` (explore + modify).
Explore and Plan skip `CLAUDE.md` to stay fast; all other subagents load it.

> Version note: as of Claude Code v2.1.198, `/agents` no longer opens a creation
> wizard — you create subagents by asking Claude to write the file, or by editing
> `.claude/agents/` yourself. Also as of v2.1.198, subagents run in the
> **background by default**; permission prompts still surface in your session.

---

## Pre-flight

- [ ] `claude` started from the repo root (so `.claude/agents/` is picked up)
- [ ] `npm test` green (7 tests)
- [ ] `demos/01-subagents/GUIDE.md` open on your second screen

---

## Run of show

### Step 1 — Feel the problem subagents solve (2 min)

Type:

```
How does a request flow from route to store in this codebase? Walk me through it.
```

**Watch for:** Claude delegates the exploration to the built-in **Explore**
subagent. Point at the subagent panel below the prompt while it runs.

**Say:** "All the file reading is happening in a *separate* context window.
When it finishes, only the summary lands in mine. If I did this myself, those
file contents would sit in my context for the rest of the session, costing
tokens on every subsequent turn. That's context engineering — Day 2 material —
implemented as an architectural feature."

### Step 2 — Anatomy of a subagent (2 min)

Open `.claude/agents/code-reviewer.md` on screen. Walk the frontmatter line by line:

| Field | What to say |
| --- | --- |
| `name` | The identity. Claude and @-mentions refer to it by this. |
| `description` | **The routing signal.** Claude reads this to decide when to delegate. "Use proactively" makes it eager. |
| `tools: Read, Grep, Glob, Bash` | An allowlist. No Edit, no Write — this reviewer *cannot* change code. Least privilege, enforced by the harness. |
| `model: inherit` | Runs on whatever the session runs on. Compare with doc-writer in Step 5. |
| `memory: project` | Gets a persistent directory under `.claude/agent-memory/` that survives across sessions — it literally learns this codebase. |
| The markdown body | The subagent's *entire* system prompt. It does not get the full Claude Code system prompt — it gets this, plus CLAUDE.md, plus the task. |

### Step 3 — Delegate a review (3 min)

```
Use the code-reviewer subagent to review src/services and src/routes.
```

**Expected findings:** the O(n²) loop in `userService.isEmailTaken`, zero
validation on `POST /api/users` (mass assignment), `GET /api/users/:id`
returning 200 with `null` instead of 404, DELETE ignoring missing ids.

**If it flags the PATCH truthiness filter in `tasks.js`:** don't deny it —
say "good catch, park that one; after the break we're going to hunt it properly
with a whole team." (That's the Demo 2 bug.)

**Say:** "Notice I didn't tell it *how* to review. The checklist lives in the
agent file — versioned, reviewed in PRs, improved by the team. The prompt
engineering happened once, not per request. That's the harness-as-artifact idea
from the Agent Harness section."

### Step 4 — Parallel subagents (3 min)

```
Research the routes, services, and store layers in parallel using three
separate subagents, then summarize how the layers interact and where the
boundaries leak.
```

**Watch for:** three subagents running concurrently in the panel.

**Say:** "Independent questions → parallel workers. But note the ceiling: all
three still report back *to me*, into *my* context window. They can't talk to
each other, and I'm the single coordinator. Hold that thought — it's exactly
the limitation Agent Teams remove in the next demo."

### Step 5 — Intelligent model routing (2 min)

Open `.claude/agents/doc-writer.md`, point at `model: haiku`, then:

```
Use the doc-writer subagent to write docs/API.md documenting every endpoint:
method, path, request body, responses, and a curl example for each.
```

**Say:** "This is the Economies slide running for real. Documentation is
deterministic grunt work — it does not need frontier-model tokens. One line of
YAML routes it to a model that's a fraction of the cost. Same output quality,
different bill. Also: notice it documents what the code *does*, including the
missing validation — its prompt forbids flattery."

### Step 6 — A subagent that writes: tests (3 min)

```
Use the test-writer subagent to add tests for src/services/userService.js,
then run the test suite.
```

**Expected:** a new `tests/userService.test.js`, suite green, and a report of
behaviors covered. It may *report* bugs it noticed (its prompt says report,
don't fix).

**Say:** "Different job, different permissions: this one *does* get Edit and
Write, plus Bash to run vitest. Capability follows role. And its prompt encodes
our testing conventions from CLAUDE.md, so the tests come out house-style."

### Step 7 — Chaining + control (1 min, rapid fire)

```
Use the code-reviewer to identify the single worst issue in
src/services/userService.js, then fix it and have the test-writer add a
regression test for the fix.
```

While it runs, mention the control surface:

- **Ctrl+B** backgrounds a running subagent; you keep working while it finishes.
- Subagents can be **resumed**: "Continue that code review and now cover the
  middleware" picks up the same agent with its full history.
- `@`-mention (`@code-reviewer (agent)` from the typeahead, or type
  `@agent-code-reviewer`) *guarantees* a specific subagent runs instead of
  letting Claude choose.
- `claude --agent code-reviewer` starts a whole session *as* that agent.

---

## Wrap-up line

"One conversation, many disposable specialists: isolated context, scoped tools,
routed models. The constraint is that everything funnels back through me — one
coordinator, one context window. Next: what happens when the workers get their
own sessions and talk to each other."

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Claude answers directly instead of delegating | Name the agent explicitly ("Use the code-reviewer subagent…") or @-mention it. |
| "Can't find the subagent" | Start Claude from the repo root; if `.claude/agents/` was created mid-session, restart Claude Code. |
| Reviewer tries to edit a file | It can't — no Edit in `tools`. Show the denial as a feature, not a bug. |
| Results flood the main context | You asked several subagents for *detailed* results. Ask for summaries; that's the point. |

## Learner exercises (self-paced)

1. Ask Claude to create a `security-auditor` subagent in `.claude/agents/` that
   is read-only, uses Sonnet, and checks the OWASP top risks relevant to an API.
   Inspect the file it writes before using it.
2. Add `isolation: worktree` to test-writer's frontmatter and re-run Step 6.
   Where did the edits land? (See the worktrees doc — the subagent got a
   temporary, isolated copy of the repo.)
3. Run `claude --agent doc-writer` and ask for a README section. What changed
   about the whole session?
4. Give code-reviewer `memory: project`, run two reviews, then look inside
   `.claude/agent-memory/code-reviewer/`. That's compound learning on disk.
