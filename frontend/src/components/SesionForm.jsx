import { useEffect, useState } from 'react';
import sesionesService from '../services/sesiones.service.js';

const initialForm = {
  nombre: '',
  deporte: '',
  duracionMinutos: '',
  nivel: '',
  fecha: '',
};

function SesionForm({ selectedSesion = null, onSaved, onCreated, onCancel }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSelectedSesion = () => {
    if (!selectedSesion) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      nombre: selectedSesion.nombre || '',
      deporte: selectedSesion.deporte || '',
      duracionMinutos: selectedSesion.duracionMinutos ?? '',
      nivel: selectedSesion.nivel || '',
      fecha: selectedSesion.fecha ? selectedSesion.fecha.slice(0, 10) : '',
    });
  };

  useEffect(() => {
    loadSelectedSesion();
  }, [selectedSesion]);

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
        nombre: formData.nombre,
        deporte: formData.deporte,
        duracionMinutos: Number(formData.duracionMinutos),
        nivel: formData.nivel,
        fecha: formData.fecha,
      };

      if (selectedSesion) {
        await sesionesService.update(selectedSesion.id || selectedSesion._id, payload);
        onSaved?.('Sesión actualizada con éxito.');
      } else {
        await sesionesService.create(payload);
        onSaved?.('Sesión creada con éxito.');
      }

      setFormData(initialForm);
      onCreated?.();
    } catch (err) {
      setError(err.message || 'No se pudo guardar la sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>{selectedSesion ? 'Editar sesión' : 'Nueva sesión'}</h2>
        <span style={styles.pill}>Formulario</span>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre
          <input name="nombre" value={formData.nombre} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Deporte
          <input name="deporte" value={formData.deporte} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Duración (minutos)
          <input type="number" name="duracionMinutos" value={formData.duracionMinutos} onChange={handleChange} required style={styles.input} />
        </label>

        <label style={styles.label}>
          Nivel
          <select name="nivel" value={formData.nivel} onChange={handleChange} required style={styles.input}>
            <option value="">Seleccionar nivel</option>
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </label>

        <label style={styles.label}>
          Fecha
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required style={styles.input} />
        </label>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.actions}>
          <button type="submit" disabled={loading} style={styles.primaryButton}>
            {loading ? (selectedSesion ? 'Guardando...' : 'Creando...') : selectedSesion ? 'Actualizar sesión' : 'Crear sesión'}
          </button>
          {selectedSesion && (
            <button type="button" onClick={onCancel} style={styles.secondaryButton}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default SesionForm;

const styles = {
  card: {
    borderRadius: 24,
    border: '1px solid #e8ead4',
    backgroundColor: '#fff',
    padding: 20,
    boxShadow: '0 4px 12px rgba(15,23,42,0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1d10',
  },
  pill: {
    borderRadius: 999,
    backgroundColor: '#d4ff00',
    padding: '6px 12px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#5f7400',
  },
  form: {
    display: 'grid',
    gap: 10,
  },
  label: {
    display: 'grid',
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: '#444932',
  },
  input: {
    borderRadius: 12,
    border: '1px solid #e8ead4',
    backgroundColor: '#f4f5df',
    padding: '10px 12px',
    fontSize: 14,
    color: '#1a1d10',
    outline: 'none',
  },
  error: {
    color: '#ba1a1a',
    fontWeight: 700,
  },
  actions: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    paddingTop: 6,
  },
  primaryButton: {
    borderRadius: 12,
    backgroundColor: '#d4ff00',
    padding: '10px 14px',
    fontSize: 14,
    fontWeight: 700,
    color: '#5f7400',
    border: 'none',
  },
  secondaryButton: {
    borderRadius: 12,
    border: '1px solid #0058bc',
    backgroundColor: '#fff',
    padding: '10px 14px',
    fontSize: 14,
    fontWeight: 700,
    color: '#0058bc',
  },
};
