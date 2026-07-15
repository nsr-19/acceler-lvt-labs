// src/api/snapshot.ts
// Public API route for snapshot requests. Enforces TLS and validates host.
import { pullSnapshot } from "../integrations/onvifCamera";
import { loadDeviceConfig } from "./config";

const HOST_PATTERN = /^[a-zA-Z0-9.-]+$/;

export async function handleSnapshot(host: string): Promise<Response> {
  if (!HOST_PATTERN.test(host)) {
    return new Response("Invalid host", { status: 400 });
  }
  const config = loadDeviceConfig(host);
  return pullSnapshot(host, config.token);
}
