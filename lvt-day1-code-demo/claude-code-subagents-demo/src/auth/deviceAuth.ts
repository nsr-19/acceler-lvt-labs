// src/auth/deviceAuth.ts
// Existing authentication module. The codebase-explorer subagent should
// be able to locate this when asked where ONVIF auth is validated.

import { createHash } from "crypto";

export interface DeviceToken {
  nonce: string;
  created: string;
  password: string;
  digest: string;
}

/**
 * Validates an ONVIF WS-UsernameToken digest for a camera device.
 * The digest is sha1(nonce + created + password), base64-encoded.
 */
export function validateDigest(token: DeviceToken): boolean {
  const expected = createHash("sha1")
    .update(token.nonce + token.created + token.password)
    .digest("base64");
  return expected === token.digest;
}
