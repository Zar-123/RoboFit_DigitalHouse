import { useEffect, useState } from 'react';
import workoutLogsService from '../services/workoutLogs.service.js';

function WorkoutLogsList({ refreshKey = 0, onEdit, onDeleted }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLogs = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await workoutLogsService.getAll();
        if (isMounted) {
          setLogs(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'No se pudieron cargar los workout logs.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLogs();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const handleDelete = async (item) => {
    if (!window.confirm('¿Eliminar este workout log?')) {
      return;
    }

    try {
      await workoutLogsService.remove(item.id || item._id);
      setLogs((prev) => prev.filter((log) => log.id !== item.id && log._id !== item._id));
      onDeleted?.();
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el workout log.');
    }
  };

  return (
    <section style={styles.card}>
      <h2 style={styles.title}>Workout Logs</h2>

      {loading && <p style={styles.muted}>Cargando registros...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && logs.length === 0 && (
        <p style={styles.muted}>No hay workout logs para mostrar.</p>
      )}

      {!loading && !error && logs.length > 0 && (
        <ul style={styles.list}>
          {logs.map((item) => (
            <li key={item.id || item._id} style={styles.item}>
              <div style={styles.row}>
                <strong>{item.exercise || 'Sin ejercicio'}</strong>
                <div style={styles.actions}>
                  <button type="button" style={styles.editButton} onClick={() => onEdit?.(item)}>
                    Editar
                  </button>
                  <button type="button" style={styles.deleteButton} onClick={() => handleDelete(item)}>
                    Eliminar
                  </button>
                </div>
              </div>
              <span>Sets: {item.sets ?? '-'}</span>
              <span>Reps: {item.reps ?? '-'}</span>
              <span>Peso: {item.weight ?? '-'}</span>
              <span>Duration: {item.duration ?? '-'}</span>
              <span>Fecha: {item.date ? new Date(item.date).toLocaleDateString() : '-'}</span>
            </li>
          ))}
        </ul>
      )}
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
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gap: 10,
  },
  item: {
    display: 'grid',
    gap: 4,
    border: '1px solid #edf2f7',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8fbff',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  actions: {
    display: 'flex',
    gap: 8,
  },
  editButton: {
    border: '1px solid #2563eb',
    borderRadius: 8,
    padding: '6px 10px',
    backgroundColor: '#fff',
    color: '#2563eb',
    cursor: 'pointer',
  },
  deleteButton: {
    border: '1px solid #dc2626',
    borderRadius: 8,
    padding: '6px 10px',
    backgroundColor: '#fff',
    color: '#dc2626',
    cursor: 'pointer',
  },
  muted: {
    color: '#4b5563',
  },
  error: {
    color: '#b91c1c',
  },
};

export default WorkoutLogsList;
