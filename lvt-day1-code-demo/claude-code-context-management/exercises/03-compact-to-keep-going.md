# Exercise 3: Compact to Keep Going

## Goal
Free up context space while keeping a memory of what you were doing, so you can continue on the same feature.

## Context
You are still working on the snapshot flow from Exercise 2 and want to continue, but the window is filling. Instead of clearing everything, you summarize.

## Steps
1. Compact the session:

```
/compact
```

2. Confirm the effect:

```
/context
```

## What to observe
Claude replaces the detailed history with a structured summary and keeps that summary in context. When you run `/context` again, usage has dropped compared to the end of Exercise 2. You can keep working on the snapshot flow, because Claude still remembers what it found, just in condensed form.

## Important: compaction can lose detail
Compaction summarizes and discards. Some specifics from the earlier conversation may not survive. If a detail matters for the long term, do not rely on it surviving here. Save it somewhere durable instead, which is exactly what Exercise 5 covers.

## Outcome
You know how to reclaim space in the middle of a task without losing the thread of what you are building, and you understand that compaction trades detail for space.
