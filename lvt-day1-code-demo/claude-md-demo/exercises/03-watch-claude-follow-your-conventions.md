# Exercise 03: Watch Claude Follow Your Conventions

This is the core exercise. You ask Claude to build a new feature and, without
restating any rules, watch it apply everything the `CLAUDE.md` already told it. The
feature is a new camera integration module for an Axis camera.

## Before You Start: Read the Reference Module

The workflow section of `CLAUDE.md` says:

> For new integrations: explore the existing module in src/integrations/ first, then
> plan, then implement, then add a test.

So begin the way the workflow asks. Open the existing reference module,
`src/integrations/hikvisionCamera.ts`, and read it closely:

```typescript
// src/integrations/hikvisionCamera.ts
// Reference integration that follows the conventions in CLAUDE.md:
// TLS endpoint, credentials from config, validated input.
import { loadDeviceConfig } from "../api/config";

const HOST_PATTERN = /^[a-zA-Z0-9.-]+$/;

export async function pullSnapshot(host: string): Promise<Response> {
  if (!HOST_PATTERN.test(host)) {
    throw new Error("Invalid host");
  }
  const { token } = loadDeviceConfig(host);
  const url = `https://${host}/ISAPI/Streaming/channels/101/picture`;
  return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
}
```

This is the pattern a new integration should follow. Notice five conventions living
in these few lines: a TLS `https://` endpoint, a validated host, a token pulled from
config rather than hardcoded, a named export, and two space indentation.

Notice the starting state too. `src/integrations/` contains only this reference
module. There is no Axis module yet, because building it is your job in this exercise.
This absence is deliberate, not an oversight.

## What to Do

Ask for the task without restating any of the rules:

```
Add a new integration module for an Axis camera in src/integrations/
```

That is the entire prompt. You are deliberately not mentioning TLS, credentials,
validation, exports, indentation, or the workflow.

## What to Observe

Claude applies what the file already told it. Watch for each convention appearing in
the module it writes, none of which was in your request:

- It uses a TLS endpoint (`https://`) rather than plain `http://`.
- It reads credentials from config through `loadDeviceConfig` instead of hardcoding
  them.
- It validates the caller supplied host before using it in a URL.
- It uses named exports and two space indentation.
- It follows the explore, plan, implement workflow, and then adds a test.

None of that came from your prompt. It came from `CLAUDE.md`.

## What to Look for in the Code

Open the new Axis module Claude creates and check it against the reference:

- **TLS endpoint.** The request URL should start with `https://`, matching the
  hikvision reference. If you see plain `http://`, the convention was not applied.
- **Credentials from config.** The token should come from `loadDeviceConfig(host)`,
  the same helper `src/api/config.ts` exposes. There should be no literal token or
  password anywhere in the file.
- **Validated input.** There should be a host check, similar to the `HOST_PATTERN`
  guard, before the host is placed into the URL.
- **Named export and formatting.** The module should use a named export and two space
  indentation, consistent with the rest of the source.

## Learning Outcome

Conventions written once in `CLAUDE.md` propagate to new work automatically. You asked
for a feature in a single sentence, and Claude produced code that honoured the
project's security rules, style, and workflow without a single reminder. This is the
payoff of the whole lesson: a few minutes documenting your project saves you from
explaining it again every session.

When you are done, continue to the optional [Exercise 04](04-capture-a-recurring-correction.md).
