// src/integrations/onvifCamera.ts
// Per-camera integration. Pulls a snapshot over a TLS ONVIF endpoint.
export async function pullSnapshot(host: string, token: string): Promise<Response> {
  const url = `https://${host}/onvif/snapshot`;
  return fetch(url, { headers: { Authorization: `Bearer ${token}` } });
}
