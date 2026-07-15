# Exercise 1: Explore the Sample Codebase

Before you build any subagents, get familiar with the code they will act on. The
project already contains a small ONVIF camera integration codebase, so you do not
have to create it. This exercise is about reading it with intent.

## What to do

Open the two source files and read them closely:

- `src/auth/deviceAuth.ts` is an existing authentication module. This is what your
  exploration subagent will locate later.
- `src/integrations/onvifCamera.ts` is a newly written integration module. This is
  what your review subagent will examine later. It contains several deliberate
  problems.

## What to look for in the code

In `src/auth/deviceAuth.ts`:

- The `DeviceToken` interface that models a token from a camera device.
- The `validateDigest` function, which checks an ONVIF device token digest by
  hashing the nonce, the created timestamp, and the password, then comparing the
  result against the supplied digest.

In `src/integrations/onvifCamera.ts`, read the comment block at the top of the file
first. It lists four planted issues on purpose:

1. A default `admin` credential fallback.
2. An unencrypted `http://` endpoint.
3. Unvalidated `host` and `query` values concatenated straight into the URL, which
   opens the door to injection and server side request forgery.
4. No authentication before a frame is pulled.

Trace each item to the exact line that causes it. For example, the default
credential lives in the `DEFAULT_CAMERA_PASSWORD` constant, and the unencrypted
endpoint and the unsafe concatenation both live in the line that builds the snapshot
URL inside `pullSnapshot`.

## Important: do not fix anything

These issues are deliberate. They exist so that your review subagent has something
real to find in a later exercise. Leave the code exactly as it is. The project
README explains this in its section on intentional flaws. Your task here is to
notice the flaws and understand why each one is a problem, not to repair them.

## What to observe

- The authentication logic and the integration logic live in separate files under
  `src/`. That separation is what makes the exploration subagent useful later: it
  can point you to the right file without you reading everything.
- The comment block in `onvifCamera.ts` is a map of what a good reviewer should
  surface. Keep it in mind when you reach Exercise 6 and compare it against what the
  review subagent reports on its own.

## Learning outcome

You now understand the material your subagents will work against, and you can name
the four deliberate weaknesses in the integration module. You also understand that
these weaknesses are teaching material and must stay in place.
