# Exercise 5: Delegate an Exploration Task

Now put the exploration subagent to work. You will ask a question that would
otherwise require reading several files, and watch the subagent return a focused
answer while the digging stays out of your main conversation.

## What to do

Ask the exploration subagent where and how device authentication is validated. Use
this prompt exactly:

```
Use the codebase-explorer: where and how is ONVIF device authentication validated?
```

## What to observe

- The explorer spins up in its own context, searches the codebase, and returns a
  focused answer. It should point you to the `validateDigest` function in
  `src/auth/deviceAuth.ts` and explain how the device token digest is checked.
- Look at what your main conversation actually records: the question and the summary.
  The individual searches and file reads happened inside the subagent's context and
  were discarded. That is the core benefit. You got the fact without the clutter.

## What to look for in the code

Open `src/auth/deviceAuth.ts` and confirm the answer against the source. The
`validateDigest` function rebuilds the expected digest from the nonce, the created
timestamp, and the password, then compares it against the digest on the token. The
subagent should have led you straight here with a file path and a line number,
rather than making you read the whole file.

## The tradeoff

You gained a clean main context, but you gave up visibility into the path the
subagent took. That is the deal with delegation: you see the destination, not the
journey. It is a good trade when you only need the answer, and a poor one when you
need to react to each step along the way.

## Learning outcome

You have delegated a research task and seen how a subagent keeps exploration out of
your main context. You can explain the tradeoff between a clean context and lost
visibility.
