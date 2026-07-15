// src/auth/deviceAuth.ts
import { createHash } from "crypto";

export interface DeviceToken {
  nonce: string;
  created: string;
  password: string;
  digest: string;
}

export function validateDigest(token: DeviceToken): boolean {
  const expected = createHash("sha1")
    .update(token.nonce + token.created + token.password)
    .digest("base64");
  return expected === token.digest;
}
