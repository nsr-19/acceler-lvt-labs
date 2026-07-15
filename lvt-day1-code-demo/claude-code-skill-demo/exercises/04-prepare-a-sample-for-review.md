# Exercise 4: Prepare a Sample for Review

## Goal

Get the sample camera module in front of you and understand the planted issues before
you ask the Skill to review it.

## What to do

This repository already includes the sample at `cameraClient.ts` in the project root,
so you do not need to write it yourself. Open it and read it closely.

If you are running the review from a separate working directory such as `~/skill-lab`,
copy the sample there first:

```bash
cp cameraClient.ts ~/skill-lab/
```

The sample looks like this:

```typescript
// cameraClient.ts
// Sample module for the skill demo. Contains three deliberate issues:
//   1. Hardcoded credentials in the RTSP URL
//   2. Unencrypted rtsp:// stream
//   3. The stream URL (with credentials) written to logs

const RTSP_URL = "rtsp://admin:admin123@10.0.0.42:554/stream1";
const ONVIF_TOKEN = "device-tok-9f3a-PROD";

export async function connect(): Promise<Response> {
  console.log(`Connecting to ${RTSP_URL}`); // logs credentials
  return fetch(RTSP_URL);
}

export function getDeviceToken(): string {
  return ONVIF_TOKEN;
}
```

## What to look for in the code

The header comment states plainly that the file contains deliberate issues. Read each
line and connect it to the Skill's checklist:

1. **Hardcoded credentials.** `RTSP_URL` embeds the username and password
   `admin:admin123` directly in source. This matches checklist item 1 (hardcoded
   secrets) and item 3 (default `admin/admin` credentials).
2. **Unencrypted stream.** The URL uses plain `rtsp://` rather than `rtsps://`, so the
   video and control traffic is not protected by TLS. This matches checklist item 2.
3. **Credentials written to logs.** `console.log` prints the full `RTSP_URL`, which
   includes the embedded password, straight into the logs. This matches checklist
   item 5.
4. **Exposed device token.** `ONVIF_TOKEN` is another hardcoded secret, and
   `getDeviceToken` returns it directly. Checklist item 1 calls out ONVIF device
   tokens specifically.

## Important: do not fix these issues

These flaws are planted on purpose. They are the whole point of the exercise: they
give the Skill something concrete to detect. Your job here is to notice them and
understand why each one is a risk, not to repair them. Leave the file exactly as it
is so the review in the next exercise has something to find.

## Learning outcome

You can read camera client code and map concrete lines to specific security risks,
and you understand why the sample keeps its flaws in place for the review.
