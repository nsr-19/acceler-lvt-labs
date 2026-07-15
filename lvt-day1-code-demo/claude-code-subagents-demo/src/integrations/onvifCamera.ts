// src/integrations/onvifCamera.ts
// Newly written integration module for the review demo.
// Deliberate issues for the integration-reviewer to find:
//   1. Default "admin" credential fallback
//   2. Unencrypted http:// endpoint
//   3. Unvalidated host/query concatenated into the URL (injection / SSRF)
//   4. No authentication before pulling a frame

const DEFAULT_CAMERA_PASSWORD = "admin"; // used when a device has no password set

/**
 * Pulls a snapshot frame from a camera over its ONVIF endpoint.
 */
export async function pullSnapshot(host: string, query: string): Promise<Response> {
  const url = `http://${host}/onvif/snapshot?${query}`;
  console.log(`Fetching snapshot from ${url}`);
  return fetch(url);
}

export function resolvePassword(devicePassword?: string): string {
  return devicePassword ?? DEFAULT_CAMERA_PASSWORD;
}
