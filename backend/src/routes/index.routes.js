import { Router } from 'express';
import workoutsRoutes from './workouts.routes.js';
import sesionesRoutes from './sesiones.routes.js';

const router = Router();

// Healthcheck endpoint
router.get('/api/health', async (req, res) => {
  return res.status(200).json({
    status: 'ok'
  });
});

// Workout routes
router.use('/api', workoutsRoutes);
// Sesiones routes
router.use('/api', sesionesRoutes);

export default router;