# Day 4 Code Demos — Agent Orchestration with Claude Code

Hands-on demos for **AI Builders Program · Day 4**: SubAgents, Agent Teams, and
Dynamic Workflows. One repo, three guided demos, two audiences:

- **Instructors** — each guide is a run-of-show: exact prompts to type, what to
  say while agents work, what the room should watch for, and what to do when
  things go sideways.
- **Learners** — the same guides double as self-paced reference material. Every
  step explains the *concept* behind the command, with links to the official docs.

---

## The target codebase: TaskFlow

TaskFlow is a deliberately small Express REST API (tasks + users) so nobody
spends brainpower understanding the app instead of the agents.

```
src/
├── routes/        HTTP + validation      (tasks.js, users.js, health.js)
├── services/      business logic         (taskService.js, userService.js)
├── store/         in-memory persistence  (memoryStore.js)
└── middleware/    error handling
tests/             vitest + supertest (green at baseline)
.claude/
├── agents/        3 custom subagents (demo 1 teaching material)
├── settings.json  agent teams enabled + pre-approved commands
└── workflows/     empty — you save a workflow here live in demo 3
CLAUDE.md          project memory every agent & teammate loads
demos/             the three guides
```

### The seeded material (instructor spoiler map)

The repo is intentionally imperfect. Every flaw is a demo target:

| Location | Flaw | Used by |
| --- | --- | --- |
| `src/routes/tasks.js` PATCH | **The bug**: fields are copied with `if (req.body[field])`, so any *falsy* value (`false`, `""`, `0`) is silently dropped. Un-completing a task returns 200 but changes nothing. | Demo 2 bug hunt |
| `src/services/taskService.js` | A convoluted-looking merge that is actually **correct** | Demo 2 red herring |
| `src/store/memoryStore.js` | A read cache that looks stale-prone but is actually **correct** | Demo 2 red herring |
| `src/services/userService.js` | No tests; `isEmailTaken` is a pointless O(n²) loop | Demo 1 (test-writer, code-reviewer) |
| `src/routes/users.js` | POST has zero validation (mass assignment), GET `/:id` never 404s, DELETE ignores missing ids | Demo 1 review findings, Demo 3 audit targets |
| `tests/tasks.test.js` | Covers `completed: true` but **not** `completed: false` — the coverage gap that let the bug ship | Demo 2 closing point |

---

## Setup (instructor: do this before the session)

1. **Requirements**
   - Node.js 18+ (`node --version`)
   - Claude Code — current version (`claude --version`). Agent teams are
     experimental; dynamic workflows need v2.1.154+ and a paid plan (on Pro,
     enable them via the *Dynamic workflows* row in `/config`).
2. **Install and verify the baseline**
   ```bash
   npm install
   npm test          # 7 tests, all green
   ```
3. **Make it a git repo and tag the baseline** (worktrees and safe resets need git):
   ```bash
   git init && git add -A && git commit -m "demo baseline" && git tag demo-start
   ```
4. **Start Claude Code from the repo root** so it picks up `CLAUDE.md`,
   `.claude/agents/`, and `.claude/settings.json` (which already sets
   `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` and pre-approves `npm test` so
   teammates don't spam permission prompts).
5. **Dry-run each demo once.** Agents are non-deterministic; knowing the shape
   of a good run makes live variance easy to narrate.

**Reset between runs / sessions:**
```bash
git reset --hard demo-start && git clean -fd
```

---

## Session run-of-show

Matches the two "Code Demo" slots in the Day 4 deck:

| Slot | Demo | Guide | Time | Deck tie-in |
| --- | --- | --- | --- | --- |
| Demo slot 1 | **1. SubAgents** — focused delegation | `demos/01-subagents/GUIDE.md` | ~15 min | Pattern 1; model routing → Economies |
| Demo slot 1 | **2. Agent Teams** — true parallel execution | `demos/02-agent-teams/GUIDE.md` | ~25 min | Pattern 2; subagents-vs-teams table; factory model |
| Demo slot 2 | **3. Dynamic Workflows** (+ plugins & worktrees bonus) | `demos/03-dynamic-workflows/GUIDE.md` | ~15 min | "Who holds the plan"; plugins slide |

The demos are progressive: 1 introduces delegation, 2 removes the
"single orchestrator" constraint, 3 moves the plan out of the conversation and
into a rerunnable script. Run them in order.

---

## How this repo teaches (read this, learners)

The configuration files are not scaffolding — they are the curriculum:

- **`CLAUDE.md`** is project memory. Every teammate and (almost) every subagent
  loads it. The "Learned rules" section at the bottom is where compound
  learning happens: demos append gotchas there, and every future session
  benefits. This is the AGENTS.md pattern from the deck's "5 patterns to start
  today".
- **`.claude/agents/*.md`** are real subagent definitions. Open them. The YAML
  frontmatter *is* the lesson: `tools` enforces least privilege, `model: haiku`
  is intelligent model routing, `memory: project` is persistent learning,
  `description` is how Claude decides when to delegate.
- **`.claude/settings.json`** shows the two habits that make teams pleasant:
  the experimental flag lives in the repo (everyone who clones gets it) and
  common commands are pre-approved so permission prompts don't bubble up
  mid-demo.

## Official docs

- SubAgents — https://code.claude.com/docs/en/sub-agents
- Agent Teams — https://code.claude.com/docs/en/agent-teams
- Dynamic Workflows — https://code.claude.com/docs/en/workflows
- Worktrees — https://code.claude.com/docs/en/worktrees
- Agent View (background sessions) — https://code.claude.com/docs/en/agent-view
- Plugins — https://code.claude.com/docs/en/discover-plugins
