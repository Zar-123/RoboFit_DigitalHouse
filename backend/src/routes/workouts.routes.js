import { Router } from 'express';
import WorkoutLogController from '../controllers/WorkoutLog.controller.js';

const router = Router();

// Get all workout logs for a session
router.get('/sesiones/:sesionId/workouts', (req, res) => {
  WorkoutLogController.getAll(req, res);
});

// Get a single workout log
router.get('/sesiones/:sesionId/workouts/:id', (req, res) => {
  WorkoutLogController.getById(req, res);
});

// Create a new workout log
router.post('/sesiones/:sesionId/workouts', (req, res) => {
  WorkoutLogController.create(req, res);
});

// Update a workout log
router.put('/sesiones/:sesionId/workouts/:id', (req, res) => {
  WorkoutLogController.update(req, res);
});

// Delete a workout log
router.delete('/sesiones/:sesionId/workouts/:id', (req, res) => {
  WorkoutLogController.remove(req, res);
});

export default router;
