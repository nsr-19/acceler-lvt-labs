# Exercise 5: Run the Review

## Goal

Ask Claude to review the sample and watch the Skill activate on its own and apply the
checklist.

## What to do

Request a review using natural phrasing:

```
Security-review cameraClient.ts
```

## What to observe

- Claude detects that your request matches the `surveillance-security-review` Skill
  and prompts you to confirm loading it. Confirming keeps you aware of the context
  Claude is pulling in.
- Once loaded, Claude applies the checklist and groups its findings by severity,
  highest first. Expect it to surface the hardcoded `admin:admin123`, the plaintext
  `rtsp://` stream, and the logged stream URL, each with a recommended fix and a
  closing one line verdict.

## What to look for

- Match each finding back to the checklist item it came from. This is how you confirm
  the Skill applied the standard you wrote rather than improvising.
- Notice that the review reports and explains the issues rather than silently changing
  the file. A review Skill describes what is wrong and how to fix it, and leaves the
  decision to you. The next exercise makes that read only behavior explicit.

## Why this matters

The standard is now defined once. Every engineer with this Skill receives the same
review, in the same format, on every request, without anyone needing to recall the
checklist from memory.

## Learning outcome

You have seen a Skill activate automatically from a natural request, apply a shared
checklist, and produce a consistent, severity ordered review of real flaws.
