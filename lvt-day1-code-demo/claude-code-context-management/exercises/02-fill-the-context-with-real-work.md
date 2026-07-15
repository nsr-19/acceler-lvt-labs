# Exercise 2: Fill the Context with Real Work

## Goal
Do enough real work to grow the context noticeably, then watch the usage climb. This shows that every file Claude reads has a cost.

## Steps
1. Ask Claude to read the source files and trace the camera snapshot flow. Send this prompt exactly:

```
Read the files in src/ and explain how a camera snapshot request flows
from the API route through to the device.
```

2. Let Claude open the files under `src/api/`, `src/integrations/`, `src/auth/`, and `src/stream/` and describe the path.

3. Check the context again:

```
/context
```

## What to observe
The usage has climbed compared to your Exercise 1 baseline, and the conversation and file reads now take a visible slice of the window. This is normal. It is the cost of the exploration you just asked for. Every file Claude opened is now sitting in your context.

## What to look for in the code
A good explanation from Claude should trace this path:

- `src/api/snapshot.ts` receives the request, checks the host against a simple pattern, then loads config and calls the integration.
- `src/api/config.ts` reads the device token from an environment variable rather than hardcoding it.
- `src/integrations/onvifCamera.ts` fetches the snapshot from an `https://` ONVIF endpoint with a bearer token.
- `src/auth/deviceAuth.ts` validates an ONVIF style device digest.
- `src/stream/streamSession.ts` and `src/stream/transport.ts` manage stream sessions and enforce a TLS only transport.

The code here is intentionally small so it is easy to read. Explore it, but do not change it for these exercises.

## Outcome
You have seen for yourself that reading files consumes context, and you can measure the increase with `/context`. This sets up the next exercise, where you free the space back up.
