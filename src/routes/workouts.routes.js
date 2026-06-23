import { Router } from 'express';
import WorkoutLogController from '../controllers/WorkoutLog.controller.js';

const router = Router();

const userId = 'user-123'; // Hardcoded for now

// Get all workout logs
router.get(`/${userId}/workouts`, (req, res) => {
  WorkoutLogController.getAll({ params: { userId } }, res);
});

// Get a single workout log
router.get(`/${userId}/workouts/:id`, (req, res) => {
  WorkoutLogController.getById(req, res);
});

// Create a new workout log
router.post(`/${userId}/workouts`, (req, res) => {
  WorkoutLogController.create({ params: { userId }, body: req.body }, res);
});

// Update a workout log
router.put(`/${userId}/workouts/:id`, (req, res) => {
  WorkoutLogController.update(req, res);
});

// Delete a workout log
router.delete(`/${userId}/workouts/:id`, (req, res) => {
  WorkoutLogController.remove(req, res);
});

export default router;
