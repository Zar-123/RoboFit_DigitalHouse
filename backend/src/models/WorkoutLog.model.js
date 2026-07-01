import { supabase } from '../supabase.js';

class WorkoutLogModel {
  // Get all workout logs for a user
  static async getAll(sesionId) {
    try {
      const { data, error } = await supabase
        .from('WorkoutLog')
        .select('*')
        .eq('sesionId', sesionId);

      if (error) {
        throw error;
      }

      return data ?? [];
    } catch (error) {
      throw error;
    }
  }

  // Get a single workout log by id
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('WorkoutLog')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new workout log
  static async create(data) {
    try {
      const { data: newLog, error } = await supabase
        .from('WorkoutLog')
        .insert({
          sesionId: data.sesionId,
          exercise: data.exercise,
          sets: data.sets,
          reps: data.reps,
          weight: data.weight,
          duration: data.duration,
          date: data.date
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return newLog;
    } catch (error) {
      throw error;
    }
  }

  // Update a workout log
  static async update(id, data) {
    try {
      const { data: updatedLog, error } = await supabase
        .from('WorkoutLog')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return updatedLog;
    } catch (error) {
      throw error;
    }
  }

  // Delete a workout log
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('WorkoutLog')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default WorkoutLogModel;
