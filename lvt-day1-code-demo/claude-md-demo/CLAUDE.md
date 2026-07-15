# Project
Camera-surveillance platform. TypeScript backend that ingests RTSP/ONVIF
camera streams and exposes a device API.

# Map
- src/auth/         device authentication (ONVIF digest validation)
- src/integrations/ per-camera integration modules
- src/stream/       stream ingestion and transport
- src/api/          public device API routes

# Commands
- Dev server: `npm run dev`
- Run tests:  `npm test`
- Lint:       `npm run lint`

# Code Style
- 2-space indentation, named exports only.
- All camera/device endpoints must use TLS (rtsps:// or https://),
  never plain rtsp:// or http://.
- Never hardcode credentials or device tokens; read them from config.
- Validate any host or query value from a caller before using it in a URL.

# Workflow
For new integrations: explore the existing module in src/integrations/
first, then plan, then implement, then add a test.
