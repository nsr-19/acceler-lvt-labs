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
