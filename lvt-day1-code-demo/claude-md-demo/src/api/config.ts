// src/api/config.ts
// Credentials are read from environment/config, never hardcoded.
export interface DeviceConfig {
  token: string;
}

export function loadDeviceConfig(host: string): DeviceConfig {
  const token = process.env[`DEVICE_TOKEN_${host.replace(/\W/g, "_")}`];
  if (!token) {
    throw new Error(`No configured token for device ${host}`);
  }
  return { token };
}
