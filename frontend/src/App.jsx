import { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import SesionForm from './components/SesionForm.jsx';
import SesionList from './components/SesionList.jsx';

function App() {
  const [sesionRefreshKey, setSesionRefreshKey] = useState(0);
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [feedback, setFeedback] = useState('');

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => {
      setFeedback('');
    }, 3000);
  };

  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <header style={styles.header}>
          <div style={styles.brand}>
            <p style={styles.brandCaption}>RoboFit</p>
            <h1 style={styles.brandTitle}>Registro de actividad</h1>
            <p style={styles.brandSubtitle}>Gestión de registros de ejercicios y sesiones con un estilo visual consistente.</p>
          </div>
          <nav style={styles.nav}>
            <NavLink
              to="/sesiones"
              style={({ isActive }) => (isActive ? styles.navActive : styles.navItem)}
            >
              Sesiones
            </NavLink>
          </nav>
        </header>

        {feedback && (
          <div style={styles.feedback}>{feedback}</div>
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/sesiones" replace />} />
          <Route
            path="/sesiones"
            element={
              <section className="grid gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#1a1d10]">Sesiones</h2>
                  <span className="rounded-full bg-[#d4ff00] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#5f7400]">
                    Planificación
                  </span>
                </div>
                <div className="grid gap-4 lg:grid-cols-[minmax(320px,1fr)_minmax(320px,1fr)]">
                  <SesionForm
                    selectedSesion={selectedSesion}
                    onSaved={(message) => {
                      setSesionRefreshKey((value) => value + 1);
                      setSelectedSesion(null);
                      showFeedback(message);
                    }}
                    onCancel={() => setSelectedSesion(null)}
                  />
                  <SesionList
                    refreshKey={sesionRefreshKey}
                    onEdit={(session) => setSelectedSesion(session)}
                    onDeleted={(message) => {
                      setSesionRefreshKey((value) => value + 1);
                      showFeedback(message);
                    }}
                  />
                </div>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f9fbe5 0%, #f4f5df 100%)',
    fontFamily: "Inter, sans-serif",
  },
  container: {
    margin: '0 auto',
    minHeight: '100vh',
    maxWidth: 1024,
    padding: '24px 20px',
  },
  header: {
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    borderRadius: 24,
    border: '1px solid #e8ead4',
    backgroundColor: '#fff',
    padding: 20,
    boxShadow: '0 4px 12px rgba(15,23,42,0.05)',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  brandCaption: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#536600',
    margin: 0,
  },
  brandTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1d10',
  },
  brandSubtitle: {
    margin: 0,
    fontSize: 14,
    color: '#444932',
  },
  nav: {
    display: 'flex',
    gap: 8,
  },
  navItem: {
    display: 'inline-block',
    padding: '8px 14px',
    borderRadius: 999,
    border: '1px solid #e8ead4',
    backgroundColor: '#f4f5df',
    color: '#0058bc',
    fontWeight: 700,
    textDecoration: 'none',
  },
  navActive: {
    display: 'inline-block',
    padding: '8px 14px',
    borderRadius: 999,
    border: '1px solid #d4ff00',
    backgroundColor: '#d4ff00',
    color: '#5f7400',
    fontWeight: 700,
    textDecoration: 'none',
  },
  feedback: {
    marginBottom: 16,
    borderRadius: 16,
    border: '1px solid #b7e4b7',
    backgroundColor: '#e8f7e8',
    padding: '12px 16px',
    fontWeight: 700,
    color: '#2b5d2b',
  },
};
