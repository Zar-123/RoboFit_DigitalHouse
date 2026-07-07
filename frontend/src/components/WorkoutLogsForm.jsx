import { useEffect, useState } from 'react';
import workoutLogsService from '../services/workoutLogs.service.js';
import { normalizeDateValue } from '../utils/date.js';

const initialForm = {
  exercise: '',
  sets: '',
  reps: '',
  weight: '',
  duration: '',
  date: '',
};

function WorkoutLogsForm({ selectedWorkout, onSaved, onCancel, sesionId }) {
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
      date: normalizeDateValue(selectedWorkout.date),
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

    if (!sesionId) {
      setError('Seleccioná una sesión para guardar el ejercicio.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        exercise: formData.exercise,
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        weight: Number(formData.weight),
        duration: Number(formData.duration),
        date: normalizeDateValue(formData.date),
      };

      if (selectedWorkout) {
        await workoutLogsService.update(sesionId, selectedWorkout.id || selectedWorkout._id, payload);
        onSaved?.('Ejercicio actualizado con éxito.');
      } else {
        await workoutLogsService.create(sesionId, payload);
        onSaved?.('Ejercicio creado con éxito.');
      }

      setFormData(initialForm);
    } catch (err) {
      setError(err.message || 'No se pudo guardar el ejercicio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.card}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>{selectedWorkout ? 'Editar registro de ejercicio' : 'Nuevo ejercicio'}</h2>
        <span style={styles.badge}>Formulario</span>
      </div>
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
            {loading ? (selectedWorkout ? 'Guardando...' : 'Creando...') : selectedWorkout ? 'Actualizar ejercicio' : 'Guardar ejercicio'}
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
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    border: '1px solid #e8ead4',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: '#1a1d10',
  },
  badge: {
    display: 'inline-flex',
    backgroundColor: '#d4ff00',
    color: '#5f7400',
    borderRadius: 999,
    padding: '8px 12px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontSize: 12,
    fontWeight: 700,
  },
  form: {
    display: 'grid',
    gap: 12,
  },
  label: {
    display: 'grid',
    gap: 6,
    fontWeight: 600,
    color: '#444932',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#f4f5df',
    border: '1px solid #e8ead4',
    borderRadius: 12,
    padding: '10px 12px',
    fontSize: 14,
    color: '#1a1d10',
  },
  buttonRow: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    border: 'none',
    borderRadius: 12,
    padding: '10px 14px',
    backgroundColor: '#d4ff00',
    color: '#5f7400',
    cursor: 'pointer',
    fontWeight: 700,
    boxShadow: '0 4px 12px rgba(83, 102, 0, 0.12)',
  },
  cancelButton: {
    border: '1px solid #0058bc',
    borderRadius: 12,
    padding: '10px 14px',
    backgroundColor: '#fff',
    color: '#0058bc',
    cursor: 'pointer',
    fontWeight: 700,
  },
  error: {
    color: '#ba1a1a',
    margin: 0,
    fontWeight: 600,
  },
};

export default WorkoutLogsForm;
