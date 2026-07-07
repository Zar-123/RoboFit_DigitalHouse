import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import SesionForm from './components/SesionForm.jsx';
import SesionList from './components/SesionList.jsx';
import Welcome from './components/Welcome.jsx';

function App() {
  const [sesionRefreshKey, setSesionRefreshKey] = useState(0);
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'create'

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
            <h1 style={styles.brandTitle}>Bitácora de Entrenamiento</h1>
            <p style={styles.brandSubtitle}>Registrá tus sesiones y ejercicios sin presiones, a tu propio ritmo.</p>
          </div>
          <nav style={styles.nav}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? styles.navActive : styles.navItem)}
              end
            >
              Inicio
            </NavLink>
            <NavLink
              to="/sesiones"
              style={({ isActive }) => (isActive ? styles.navActive : styles.navItem)}
            >
              Mis Sesiones
            </NavLink>
          </nav>
        </header>

        {feedback && (
          <div style={styles.feedback}>{feedback}</div>
        )}

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/sesiones"
            element={
              <section style={styles.sesionesLayout}>
                <div style={styles.sesionesHeader}>
                  <h2 style={styles.sectionTitle}>Sesiones</h2>
                  <span style={styles.planBadge}>
                    Planificación
                  </span>
                </div>

                <div style={styles.tabContainer}>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('list');
                      setSelectedSesion(null);
                    }}
                    style={viewMode === 'list' ? styles.tabActive : styles.tabInactive}
                  >
                    📂 Ver Sesiones Realizadas
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSesion(null);
                      setViewMode('create');
                    }}
                    style={viewMode === 'create' ? styles.tabActive : styles.tabInactive}
                  >
                    ➕ Crear Nueva Sesión
                  </button>
                </div>

                <div>
                  {viewMode === 'create' ? (
                    <SesionForm
                      selectedSesion={selectedSesion}
                      onSaved={(message) => {
                        setSesionRefreshKey((value) => value + 1);
                        setSelectedSesion(null);
                        setViewMode('list'); // Switch back to list after saving
                        showFeedback(message);
                      }}
                      onCancel={() => {
                        setSelectedSesion(null);
                        setViewMode('list'); // Switch back to list on cancel
                      }}
                    />
                  ) : (
                    <SesionList
                      refreshKey={sesionRefreshKey}
                      onEdit={(session) => {
                        setSelectedSesion(session);
                        setViewMode('create'); // Switch to form automatically on edit
                      }}
                      onDeleted={(message) => {
                        setSesionRefreshKey((value) => value + 1);
                        showFeedback(message);
                      }}
                    />
                  )}
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
  sesionesLayout: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  sesionesHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1a1d10',
    margin: 0,
  },
  planBadge: {
    borderRadius: 999,
    backgroundColor: '#d4ff00',
    padding: '6px 12px',
    fontSize: '11px',
    fontWeight: 700,
    color: '#5f7400',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  tabContainer: {
    display: 'flex',
    gap: 12,
  },
  tabActive: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: 14,
    border: '1px solid #d4ff00',
    backgroundColor: '#d4ff00',
    color: '#5f7400',
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(212,255,0,0.15)',
    transition: 'all 0.2s ease',
  },
  tabInactive: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: 14,
    border: '1px solid #e8ead4',
    backgroundColor: '#fff',
    color: '#444932',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  },
};
