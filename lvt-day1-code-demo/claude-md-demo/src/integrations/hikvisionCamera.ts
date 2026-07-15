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
