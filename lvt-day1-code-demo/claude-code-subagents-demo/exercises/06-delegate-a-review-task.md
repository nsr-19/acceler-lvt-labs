# Exercise 6: Delegate a Review Task

Hand the new integration code to the review subagent. Because the reviewer sees the
file fresh, in its own context, it catches issues that a thread which just wrote the
code might overlook.

## What to do

Ask the review subagent to review the integration module. Use this prompt exactly:

```
Use the integration-reviewer to review src/integrations/onvifCamera.ts
```

## What to observe

The reviewer examines the file in a clean context and returns a structured summary
that follows your output format. Against `src/integrations/onvifCamera.ts` it should
report:

- The default `admin` password and the unencrypted `http://` endpoint as Critical
  Issues.
- The unvalidated `host` and `query` concatenation flagged for injection and server
  side request forgery risk.
- The missing authentication check before a frame is pulled.
- An Approval Status of "Requires changes".

## What to look for in the code

Open `src/integrations/onvifCamera.ts` and match each reported issue to its line.
Then read the comment block at the top of the file. It lists the same four planted
issues. Compare the two. A well designed review subagent, working only from the code
and its own checklist, should surface what that comment block describes, without ever
reading the comment as a hint.

## Important: these flaws are deliberate

The issues the reviewer finds are planted on purpose. They are the reason this file
exists. Do not fix them, and do not ask the subagent to fix them. The reviewer is
read only by design, so it reports issues rather than changing code. Your goal is to
confirm that the reviewer found the planted problems and described them clearly, not
to repair the file. The project README explains why the flaws stay in place.

## Why fresh eyes matter

If you had written this integration over many turns and then asked that same
conversation to review it, the feedback would likely be weak, because the same thread
helped create the code. A reviewer subagent starts clean, with no memory of writing
the code, and applies its criteria without that history. That is why the review is
sharper.

## Learning outcome

You have delegated a review to a subagent, confirmed it found the deliberate security
issues, and seen why a fresh, isolated context produces a stronger review than asking
the author to check its own work.
