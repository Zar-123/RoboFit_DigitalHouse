import { Router } from 'express';
import workoutsRoutes from './workouts.routes.js';

const router = Router();

// Healthcheck endpoint
router.get('/api/health', async (req, res) => {
  return res.status(200).json({
    status: 'ok'
  });
});

// Workout routes
router.use('/api', workoutsRoutes);

export default router;