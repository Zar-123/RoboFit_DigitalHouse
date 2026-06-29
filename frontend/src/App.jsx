import { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import WorkoutLogsForm from './components/WorkoutLogsForm.jsx';
import WorkoutLogsList from './components/WorkoutLogsList.jsx';
import SesionForm from './components/SesionForm.jsx';
import SesionList from './components/SesionList.jsx';

function App() {
  const [workoutRefreshKey, setWorkoutRefreshKey] = useState(0);
  const [sesionRefreshKey, setSesionRefreshKey] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [feedback, setFeedback] = useState('');

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => {
      setFeedback('');
    }, 3000);
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>RoboFit</h1>
          <p style={styles.subtitle}>Gestión de Workout Logs y Sesiones con React + Vite.</p>
        </div>
        <nav style={styles.nav}>
          <NavLink
            to="/workouts"
            end
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.navLinkActive : {}),
            })}
          >
            Workouts
          </NavLink>
          <NavLink
            to="/sesiones"
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.navLinkActive : {}),
            })}
          >
            Sesiones
          </NavLink>
        </nav>
      </header>

      {feedback && <p style={styles.feedback}>{feedback}</p>}

      <Routes>
        <Route path="/" element={<Navigate to="/workouts" replace />} />
        <Route
          path="/workouts"
          element={
            <section>
              <h2 style={styles.sectionTitle}>Workout Logs</h2>
              <div style={styles.grid}>
                <WorkoutLogsForm
                  selectedWorkout={selectedWorkout}
                  onSaved={(message) => {
                    setWorkoutRefreshKey((value) => value + 1);
                    setSelectedWorkout(null);
                    showFeedback(message);
                  }}
                  onCancel={() => setSelectedWorkout(null)}
                />
                <WorkoutLogsList
                  refreshKey={workoutRefreshKey}
                  onEdit={(log) => setSelectedWorkout(log)}
                  onDeleted={() => {
                    setWorkoutRefreshKey((value) => value + 1);
                    showFeedback('Workout eliminado con éxito.');
                  }}
                />
              </div>
            </section>
          }
        />
        <Route
          path="/sesiones"
          element={
            <section>
              <h2 style={styles.sectionTitle}>Sesiones</h2>
              <div style={styles.grid}>
                <SesionForm onCreated={() => setSesionRefreshKey((value) => value + 1)} />
                <SesionList refreshKey={sesionRefreshKey} />
              </div>
            </section>
          }
        />
      </Routes>
    </main>
  );
}

const styles = {
  page: {
    fontFamily: 'sans-serif',
    padding: 24,
    backgroundColor: '#f3f7fb',
    minHeight: '100vh',
  },
  header: {
    marginBottom: 28,
  },
  title: {
    margin: 0,
    fontSize: 28,
  },
  subtitle: {
    marginTop: 6,
    color: '#4b5563',
  },
  nav: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  navLink: {
    textDecoration: 'none',
    color: '#2563eb',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid transparent',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
  },
  navLinkActive: {
    backgroundColor: '#2563eb',
    color: '#fff',
    borderColor: '#1d4ed8',
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: 18,
    color: '#1f2937',
  },
  feedback: {
    margin: '0 0 16px',
    padding: '12px 16px',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderRadius: 10,
    border: '1px solid #10b981',
  },
  grid: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    alignItems: 'start',
  },
};

export default App;
