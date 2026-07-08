import { Router } from 'express';

const router = Router();

// GET /api/health
router.get('/', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

export default router;
