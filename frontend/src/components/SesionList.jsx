import { useEffect, useState } from 'react';
import sesionesService from '../services/sesiones.service.js';

function SesionList({ refreshKey = 0, onEdit, onDeleted }) {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let isMounted = true;

  const loadSesiones = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await sesionesService.getAll();
      if (isMounted) {
        setSesiones(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      if (isMounted) {
        setError('No se pudieron cargar los registros. Intentá de nuevo.');
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted = true;
    loadSesiones();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const handleDelete = async (item) => {
    if (!window.confirm('¿Eliminar esta sesión?')) {
      return;
    }

    try {
      await sesionesService.remove(item.id || item._id);
      setSesiones((prev) => prev.filter((session) => session.id !== item.id && session._id !== item._id));
      onDeleted?.('Sesión eliminada con éxito.');
    } catch (err) {
      setError(err.message || 'No se pudo eliminar la sesión.');
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Sesiones</h2>
        <span style={styles.badge}>Registros</span>
      </div>

      {loading && (
        <div style={styles.messageCard}>
          <p style={styles.messageText}>Cargando registros…</p>
        </div>
      )}

      {!loading && error && (
        <div style={styles.messageCard}>
          <p style={styles.errorText}>No se pudieron cargar los registros. Intentá de nuevo.</p>
          <button type="button" style={styles.retryButton} onClick={loadSesiones}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && sesiones.length === 0 && (
        <div style={styles.messageCard}>
          <p style={styles.messageText}>Todavía no tenés registros. Creá el primero.</p>
        </div>
      )}

      {!loading && !error && sesiones.length > 0 && (
        <ul style={styles.list}>
          {sesiones.map((item) => (
            <li key={item.id || item._id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div>
                  <strong style={styles.itemTitle}>{item.nombre || 'Sin nombre'}</strong>
                  <p style={styles.itemMeta}>{item.deporte || '-'}</p>
                </div>
                <span style={styles.levelBadge}>{item.nivel || 'N/A'}</span>
              </div>
              <div style={styles.details}>
                <div style={styles.detail}>
                  <span style={styles.detailLabel}>Duración</span>
                  {item.duracionMinutos ?? '-'} min
                </div>
                <div style={styles.detail}>
                  <span style={styles.detailLabel}>Fecha</span>
                  {item.fecha ? new Date(item.fecha).toLocaleDateString() : '-'}
                </div>
              </div>
              <div style={styles.actions}>
                <button type="button" style={styles.editButton} onClick={() => onEdit?.(item)}>
                  Editar
                </button>
                <button type="button" style={styles.deleteButton} onClick={() => handleDelete(item)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9fbe5',
    borderRadius: 20,
    padding: 20,
    border: '1px solid #e8ead4',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 22,
    color: '#1a1d10',
    fontWeight: 600,
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
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    border: '1px solid #e8ead4',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
    marginBottom: 16,
  },
  messageText: {
    margin: 0,
    color: '#444932',
    fontSize: 14,
    lineHeight: 1.6,
  },
  errorText: {
    margin: 0,
    color: '#ba1a1a',
    fontSize: 14,
    lineHeight: 1.6,
    fontWeight: 600,
  },
  retryButton: {
    marginTop: 14,
    backgroundColor: '#d4ff00',
    color: '#5f7400',
    border: 'none',
    borderRadius: 12,
    padding: '10px 16px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(83, 102, 0, 0.12)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gap: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 20,
    border: '1px solid #e8ead4',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
    padding: 16,
    display: 'grid',
    gap: 16,
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  itemTitle: {
    margin: 0,
    fontSize: 18,
    color: '#1a1d10',
  },
  itemMeta: {
    margin: '6px 0 0',
    color: '#444932',
    fontSize: 14,
  },
  levelBadge: {
    display: 'inline-flex',
    padding: '8px 12px',
    borderRadius: 999,
    backgroundColor: '#f4f5df',
    color: '#536600',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 12,
  },
  detail: {
    backgroundColor: '#f4f5df',
    borderRadius: 12,
    padding: 12,
    border: '1px solid #e8ead4',
    color: '#444932',
    fontSize: 14,
  },
  detailLabel: {
    display: 'block',
    marginBottom: 6,
    color: '#757a60',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  editButton: {
    border: '1px solid #0058bc',
    borderRadius: 10,
    padding: '8px 12px',
    backgroundColor: '#fff',
    color: '#0058bc',
    cursor: 'pointer',
    fontWeight: 700,
  },
  deleteButton: {
    border: '1px solid #dc2626',
    borderRadius: 10,
    padding: '8px 12px',
    backgroundColor: '#fff',
    color: '#dc2626',
    cursor: 'pointer',
    fontWeight: 700,
  },
};

export default SesionList;
