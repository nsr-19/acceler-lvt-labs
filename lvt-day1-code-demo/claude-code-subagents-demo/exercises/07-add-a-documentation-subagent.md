# Exercise 7: Add a Documentation Subagent (Optional)

This final exercise shows where a custom system prompt makes a subagent genuinely
better. The default Claude Code voice is concise and code focused, which is great for
coding and wrong for documentation. A documentation subagent sets a different
audience, tone, and structure.

## What to do

You will create `.claude/agents/integration-doc-writer.md`.

### Option A: let Claude generate it (recommended)

Run:

```
/agents
```

Choose **Create new agent**, pick **Project** scope, and describe the subagent:

- Purpose: write clear, developer facing integration documentation for a camera
  surveillance platform. The audience is engineers integrating a new camera or
  device.
- Tone: precise and practical, not marketing copy.
- Tools: Glob, Grep, Read.
- Model: sonnet. Color: green.
- Output sections: an Overview of what the integration does, a Setup section for
  configuration and credentials and endpoints, a Usage section for the main
  functions and a short example, and a Security notes section.
- A firm rule: read the code to ground every statement, and do not invent behavior
  that is not in the source.

### Option B: write the file yourself

Create the file with frontmatter like this:

```markdown
---
name: integration-doc-writer
description: Writes integration documentation for camera and device modules
  in the team's standard format. Use when a new integration is ready and
  needs developer facing docs.
tools: Glob, Grep, Read
model: sonnet
color: green
---
```

Then write a system prompt that sets the audience and tone above and asks for the
four sections: Overview, Setup, Usage, and Security notes. The exact reference text
is in `Subagents.docx` if you want to match it word for word.

## Run it

Restart Claude Code, then use this prompt exactly:

```
Use the integration-doc-writer to document src/integrations/onvifCamera.ts
```

## What to observe

The result reads like documentation, not a code dump, because the system prompt set
the audience, the tone, and the structure. Compare it against what the default voice
would produce if you asked the main thread to "document this file". The difference is
the custom system prompt.

## What to look for in the code

Notice that the tool list is identical to the other two subagents: Glob, Grep, Read.
The documentation subagent is not more capable than the others in terms of tools.
What changes its output is the system prompt alone. That is the point of this
pattern.

## A note on the sample module

Because `src/integrations/onvifCamera.ts` contains deliberate security flaws, honest
Security notes for this module will describe weaknesses rather than protections. That
is expected. The flaws are teaching material and stay in place, as the project README
explains. A grounded documentation subagent should report what the code actually
does, not paper over it.

## Learning outcome

You can create a subagent whose value comes from a custom system prompt rather than
from special tools, and you can explain why tone, audience, and structure belong in
the system prompt.

## Where to go next

- Add concrete example conversations to each `description` to sharpen when Claude
  delegates.
- Share `.claude/agents/` with your team so everyone inherits the same subagents.
- Keep the anti patterns in mind. Do not chain subagents into pipelines where each
  step depends on the last, do not create expert persona subagents that add no
  capability your main thread lacks, and do not use a subagent to run tests when you
  need the full output to debug.
