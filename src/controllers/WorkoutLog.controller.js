import WorkoutLogModel from '../models/WorkoutLog.model.js';

class WorkoutLogController {
  // Get all workout logs for a user
  static getAll(req, res) {
    try {
      const { userId } = req.params;
      const logs = WorkoutLogModel.getAll(userId);
      
      return res.status(200).json({
        success: true,
        data: logs,
        count: logs.length
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Get a single workout log by id
  static getById(req, res) {
    try {
      const { id } = req.params;
      const log = WorkoutLogModel.getById(id);

      if (!log) {
        return res.status(404).json({
          success: false,
          error: 'Workout log not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: log
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Create a new workout log
  static create(req, res) {
    try {
      const { userId } = req.params;
      const { exercise, sets, reps, weight, duration, date } = req.body;

      // Validate required fields
      if (!exercise || sets === undefined || reps === undefined || weight === undefined || duration === undefined || !date) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields'
        });
      }

      const newLog = WorkoutLogModel.create({
        userId,
        exercise,
        sets,
        reps,
        weight,
        duration,
        date
      });

      return res.status(201).json({
        success: true,
        message: 'Workout log created',
        data: newLog
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Update a workout log
  static update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const log = WorkoutLogModel.getById(id);
      if (!log) {
        return res.status(404).json({
          success: false,
          error: 'Workout log not found'
        });
      }

      const updatedLog = WorkoutLogModel.update(id, updates);

      return res.status(200).json({
        success: true,
        message: 'Workout log updated',
        data: updatedLog
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Delete a workout log
  static remove(req, res) {
    try {
      const { id } = req.params;

      const log = WorkoutLogModel.getById(id);
      if (!log) {
        return res.status(404).json({
          success: false,
          error: 'Workout log not found'
        });
      }

      const deleted = WorkoutLogModel.delete(id);

      if (!deleted) {
        return res.status(500).json({
          success: false,
          error: 'Failed to delete workout log'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Workout log deleted'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default WorkoutLogController;
