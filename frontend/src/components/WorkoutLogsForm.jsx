import { useEffect, useState } from 'react';
import workoutLogsService from '../services/workoutLogs.service.js';

const initialForm = {
  exercise: '',
  sets: '',
  reps: '',
  weight: '',
  duration: '',
  date: '',
};

function WorkoutLogsForm({ selectedWorkout, onSaved, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSelectedWorkout = () => {
    if (!selectedWorkout) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      exercise: selectedWorkout.exercise || '',
      sets: selectedWorkout.sets ?? '',
      reps: selectedWorkout.reps ?? '',
      weight: selectedWorkout.weight ?? '',
      duration: selectedWorkout.duration ?? '',
      date: selectedWorkout.date ? selectedWorkout.date.slice(0, 10) : '',
    });
  };

  useEffect(() => {
    loadSelectedWorkout();
  }, [selectedWorkout]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        exercise: formData.exercise,
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        weight: Number(formData.weight),
        duration: Number(formData.duration),
        date: formData.date,
      };

      if (selectedWorkout) {
        await workoutLogsService.update(selectedWorkout.id || selectedWorkout._id, payload);
        onSaved?.('Workout actualizado con éxito.');
      } else {
        await workoutLogsService.create(payload);
        onSaved?.('Workout creado con éxito.');
      }

      setFormData(initialForm);
    } catch (err) {
      setError(err.message || 'No se pudo guardar el workout log.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.card}>
      <h2 style={styles.title}>{selectedWorkout ? 'Editar Workout Log' : 'Nuevo Workout Log'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Exercise
          <input name="exercise" value={formData.exercise} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Sets
          <input type="number" name="sets" value={formData.sets} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Reps
          <input type="number" name="reps" value={formData.reps} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Weight
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Duration (minutes)
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Date
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={styles.input} />
        </label>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.buttonRow}>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? (selectedWorkout ? 'Guardando...' : 'Creando...') : selectedWorkout ? 'Actualizar workout' : 'Crear workout log'}
          </button>
          {selectedWorkout && (
            <button type="button" style={styles.cancelButton} onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

const styles = {
  card: {
    border: '1px solid #dbe4f0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
  },
  title: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 20,
  },
  form: {
    display: 'grid',
    gap: 10,
  },
  label: {
    display: 'grid',
    gap: 6,
    fontWeight: 600,
    color: '#1f2937',
  },
  input: {
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    padding: '8px 10px',
    fontSize: 14,
  },
  buttonRow: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    border: 'none',
    borderRadius: 8,
    padding: '10px 12px',
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
  },
  cancelButton: {
    border: '1px solid #9ca3af',
    borderRadius: 8,
    padding: '10px 12px',
    backgroundColor: '#fff',
    color: '#374151',
    cursor: 'pointer',
    fontWeight: 700,
  },
  error: {
    color: '#b91c1c',
    margin: 0,
  },
};

export default WorkoutLogsForm;
