# Project
Camera-surveillance platform. TypeScript backend that ingests RTSP/ONVIF
camera streams and exposes a device API. Use this project to practise
context management with /context, /compact, and /clear.

# Map
- src/auth/         device authentication (ONVIF digest validation)
- src/integrations/ per-camera integration modules
- src/stream/       stream ingestion and transport
- src/api/          public device API routes

# Code Style
- 2-space indentation, named exports only.
- All camera/device endpoints must use TLS (https:// / rtsps://).
- Never hardcode credentials; read them from config.
