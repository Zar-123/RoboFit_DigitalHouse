import { useState } from 'react';
import sesionesService from '../services/sesiones.service.js';

const initialForm = {
  nombre: '',
  deporte: '',
  duracionMinutos: '',
  nivel: '',
  fecha: '',
};

function SesionForm({ onCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sesionesService.create({
        nombre: formData.nombre,
        deporte: formData.deporte,
        duracionMinutos: Number(formData.duracionMinutos),
        nivel: formData.nivel,
        fecha: formData.fecha,
      });

      setFormData(initialForm);
      onCreated?.();
    } catch (err) {
      setError(err.message || 'No se pudo crear la sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.card}>
      <h2 style={styles.title}>Nueva Sesión</h2>
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

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creando...' : 'Crear sesión'}
        </button>
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
  button: {
    border: 'none',
    borderRadius: 8,
    padding: '10px 12px',
    backgroundColor: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 700,
  },
  error: {
    color: '#b91c1c',
    margin: 0,
  },
};

export default SesionForm;
