// src/stream/transport.ts
// Selects the transport for a stream. TLS-only per project policy.
export type Transport = "rtsps" | "https";

export function resolveTransport(scheme: string): Transport {
  if (scheme === "rtsps" || scheme === "https") {
    return scheme;
  }
  throw new Error(`Unencrypted transport not allowed: ${scheme}`);
}
