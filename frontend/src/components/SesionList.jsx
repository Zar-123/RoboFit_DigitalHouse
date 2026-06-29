import { useEffect, useState } from 'react';
import sesionesService from '../services/sesiones.service.js';

function SesionList({ refreshKey = 0 }) {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
          setError(err.message || 'No se pudieron cargar las sesiones.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSesiones();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  return (
    <section style={styles.card}>
      <h2 style={styles.title}>Sesiones</h2>

      {loading && <p style={styles.muted}>Cargando sesiones...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && sesiones.length === 0 && (
        <p style={styles.muted}>No hay sesiones para mostrar.</p>
      )}

      {!loading && !error && sesiones.length > 0 && (
        <ul style={styles.list}>
          {sesiones.map((item) => (
            <li key={item.id || item._id} style={styles.item}>
              <strong>{item.nombre || 'Sin nombre'}</strong>
              <span>Deporte: {item.deporte || '-'}</span>
              <span>Duración: {item.duracionMinutos ?? '-'} min</span>
              <span>Nivel: {item.nivel || '-'}</span>
              <span>Fecha: {item.fecha ? new Date(item.fecha).toLocaleDateString() : '-'}</span>
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
  muted: {
    color: '#4b5563',
  },
  error: {
    color: '#b91c1c',
  },
};

export default SesionList;
