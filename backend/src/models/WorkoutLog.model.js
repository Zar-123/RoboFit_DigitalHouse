// Mock data - Replace with Supabase later
const workoutLogs = [
  {
    id: 'wl-001',
    userId: 'user-123',
    exercise: 'Bench Press',
    sets: 4,
    reps: 8,
    weight: 100,
    duration: 5,
    date: '2026-05-31'
  },
  {
    id: 'wl-002',
    userId: 'user-123',
    exercise: 'Squats',
    sets: 3,
    reps: 10,
    weight: 150,
    duration: 8,
    date: '2026-05-30'
  },
  {
    id: 'wl-003',
    userId: 'user-123',
    exercise: 'Deadlifts',
    sets: 3,
    reps: 5,
    weight: 180,
    duration: 6,
    date: '2026-05-29'
  }
];

class WorkoutLogModel {
  // Get all workout logs for a user
  static getAll(userId) {
    return workoutLogs.filter(log => log.userId === userId);
  }

  // Get a single workout log by id
  static getById(id) {
    return workoutLogs.find(log => log.id === id);
  }

  // Create a new workout log
  static create(data) {
    const newLog = {
      id: `wl-${Date.now()}`,
      userId: data.userId,
      exercise: data.exercise,
      sets: data.sets,
      reps: data.reps,
      weight: data.weight,
      duration: data.duration,
      date: data.date
    };
    workoutLogs.push(newLog);
    return newLog;
  }

  // Update a workout log
  static update(id, data) {
    const index = workoutLogs.findIndex(log => log.id === id);
    if (index === -1) return null;

    const updatedLog = {
      ...workoutLogs[index],
      ...data,
      id: workoutLogs[index].id,
      userId: workoutLogs[index].userId
    };
    workoutLogs[index] = updatedLog;
    return updatedLog;
  }

  // Delete a workout log
  static delete(id) {
    const index = workoutLogs.findIndex(log => log.id === id);
    if (index === -1) return false;

    workoutLogs.splice(index, 1);
    return true;
  }
}

export default WorkoutLogModel;
