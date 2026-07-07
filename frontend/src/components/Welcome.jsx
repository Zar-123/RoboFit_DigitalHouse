import { useState } from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  const [isHovered, setIsHovered] = useState(false);
  const [demoConsistency, setDemoConsistency] = useState(85);

  return (
    <div style={styles.welcomePage}>
      {/* Inject custom CSS classes for hover, animations, and responsiveness */}
      <style>{`
        .hero-section {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          padding: 40px 0;
        }
        @media (max-width: 900px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 32px;
            padding: 20px 0;
          }
        }
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 999px;
          background-color: #d4ff00;
          color: #1a1d10;
          font-weight: 800;
          font-size: 16px;
          text-decoration: none;
          letter-spacing: -0.01em;
          border: 1px solid #c2ea00;
          box-shadow: 0 4px 14px rgba(212, 255, 0, 0.3);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 255, 0, 0.5);
          background-color: #e5ff54;
        }
        .cta-button:active {
          transform: translateY(0);
        }
        .secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 999px;
          background-color: #ffffff;
          color: #444932;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          border: 1px solid #e8ead4;
          transition: all 0.2s ease;
          margin-left: 12px;
        }
        @media (max-width: 480px) {
          .cta-button, .secondary-btn {
            display: flex;
            width: 100%;
            margin: 8px 0;
          }
          .btn-group {
            flex-direction: column;
            width: 100%;
          }
        }
        .showcase-card {
          background: #ffffff;
          border: 1px solid #e8ead4;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .showcase-card:hover {
          transform: translateY(-4px) rotate(0.5deg);
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
          border-color: #d4ff00;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        @media (max-width: 768px) {
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 36px;
          }
        }
        .feature-card {
          background: #ffffff;
          border: 1px solid #e8ead4;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.2s ease;
        }
        .feature-card:hover {
          transform: translateY(-2px);
          border-color: #ccd0a2;
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.02);
        }
        .pulse-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f4f5df;
          color: #536600;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #0058bc;
          border-radius: 50%;
          animation: pulse 1.8s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 88, 188, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(0, 88, 188, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 88, 188, 0);
          }
        }
        .highlight-text {
          position: relative;
          display: inline-block;
        }
        .highlight-text::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 4px;
          width: 100%;
          height: 8px;
          background: #d4ff00;
          z-index: -1;
          transform: skewX(-10deg);
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div style={styles.heroContent}>
          <div className="pulse-badge" style={{ marginBottom: 16 }}>
            <span className="pulse-dot"></span>
            Bitácora Personal
          </div>
          <h2 style={styles.heroTitle}>
            Tu progreso.<br />
            Tu ritmo. <span className="highlight-text">Sin presiones.</span>
          </h2>
          <p style={styles.heroSubtitle}>
            RoboFit es una bitácora digital de entrenamiento para deportistas amateurs que entrenan solos. 
            Registrá tus sesiones y el detalle de cada ejercicio de forma simple, privada y sin la presión de las redes sociales.
          </p>
          <div className="btn-group" style={{ display: 'flex', marginTop: 32 }}>
            <Link to="/sesiones" className="cta-button">
              Comenzar bitácora →
            </Link>
            <a 
              href="#caracteristicas" 
              className="secondary-btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('caracteristicas')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Conocer más
            </a>
          </div>
        </div>

        {/* Live Demo Showcase Card */}
        <div style={styles.heroVisual}>
          <div className="showcase-card">
            <div style={styles.cardTop}>
              <span style={styles.cardCategory}>🏋️ FUERZA / MUSCULACIÓN</span>
              <span style={styles.cardBadge}>Nivel Avanzado</span>
            </div>
            
            <h3 style={styles.cardTitle}>Fuerza de Empuje & Core</h3>
            
            <div style={styles.cardMetaGrid}>
              <div style={styles.cardMetaItem}>
                <span style={styles.cardMetaLabel}>DURACIÓN</span>
                <span style={styles.cardMetaVal}>55 min</span>
              </div>
              <div style={styles.cardMetaItem}>
                <span style={styles.cardMetaLabel}>EJERCICIOS</span>
                <span style={styles.cardMetaVal}>2 registrados</span>
              </div>
              <div style={styles.cardMetaItem}>
                <span style={styles.cardMetaLabel}>FECHA</span>
                <span style={styles.cardMetaVal}>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div style={styles.exercisesList}>
              <div style={styles.exerciseItem}>
                <div style={styles.exerciseHeader}>
                  <strong style={styles.exerciseName}>Press de Banca Plano</strong>
                  <span style={styles.exerciseStats}>4 sets</span>
                </div>
                <div style={styles.exerciseSets}>
                  <span style={styles.setTag}>12 reps @ 70kg</span>
                  <span style={styles.setTag}>10 reps @ 80kg</span>
                  <span style={styles.setTag}>8 reps @ 85kg</span>
                  <span style={styles.setTag}>6 reps @ 90kg 🔥</span>
                </div>
              </div>

              <div style={styles.exerciseItem}>
                <div style={styles.exerciseHeader}>
                  <strong style={styles.exerciseName}>Prensa de Piernas inclinada</strong>
                  <span style={styles.exerciseStats}>3 sets</span>
                </div>
                <div style={styles.exerciseSets}>
                  <span style={styles.setTag}>10 reps @ 160kg</span>
                  <span style={styles.setTag}>10 reps @ 180kg</span>
                  <span style={styles.setTag}>8 reps @ 200kg</span>
                </div>
              </div>
            </div>

            <div style={styles.consistencySection}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '12px' }}>
                <span style={{ color: '#444932', fontWeight: 600 }}>Consistencia semanal</span>
                <span style={{ color: '#0058bc', fontWeight: 700 }}>{demoConsistency}%</span>
              </div>
              <div style={styles.progressBarBg} onClick={() => setDemoConsistency(prev => prev >= 100 ? 50 : prev + 15)}>
                <div style={{ ...styles.progressBarFill, width: `${demoConsistency}%` }} />
              </div>
              <span style={{ fontSize: '10px', color: '#8c9273', marginTop: 4, display: 'block' }}>
                💡 Haz clic en la barra para simular un nuevo entrenamiento.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" style={{ padding: '60px 0 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
          <span style={styles.sectionEyebrow}>Filosofía RoboFit</span>
          <h3 style={styles.sectionTitle}>Diseñado para los que entrenan en serio y solos</h3>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div style={styles.featureIcon}>🛡️</div>
            <h4 style={styles.featureTitle}>100% Privado y Enfocado</h4>
            <p style={styles.featureText}>
              Sin feeds públicos, sin 'likes' y sin algoritmos que te juzguen. Tus estadísticas son tuyas y te ayudan a concentrarte únicamente en tu rendimiento físico.
            </p>
          </div>

          <div className="feature-card">
            <div style={styles.featureIcon}>⚡</div>
            <h4 style={styles.featureTitle}>Carga Rápida en el Gimnasio</h4>
            <p style={styles.featureText}>
              Formulario optimizado para celular. Registrá tu sesión diaria y los ejercicios rápidamente entre tus series de descanso sin perder la concentración.
            </p>
          </div>

          <div className="feature-card">
            <div style={styles.featureIcon}>📈</div>
            <h4 style={styles.featureTitle}>Seguimiento Visual Consistente</h4>
            <p style={styles.featureText}>
              Revisá tus progresos, editá registros anteriores y visualizá tu constancia sin gráficos complicados que solo añaden presión a tu rutina.
            </p>
          </div>
        </div>
      </section>

      {/* Inspirational Footer */}
      <div style={styles.quoteBlock}>
        <p style={styles.quoteText}>
          "La consistencia le gana a la intensidad. Registrá hoy para superarte mañana."
        </p>
      </div>
    </div>
  );
}

export default Welcome;

const styles = {
  welcomePage: {
    padding: '10px 0 40px',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: '44px',
    lineHeight: '1.1',
    fontWeight: 800,
    color: '#1a1d10',
    margin: '12px 0 20px 0',
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#444932',
    margin: 0,
  },
  heroVisual: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardCategory: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#536600',
    letterSpacing: '0.04em',
  },
  cardBadge: {
    fontSize: '10px',
    fontWeight: 700,
    background: '#d4ff00',
    color: '#5f7400',
    padding: '4px 8px',
    borderRadius: '6px',
    textTransform: 'uppercase',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1a1d10',
    margin: '0 0 16px 0',
  },
  cardMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    borderBottom: '1px dashed #e8ead4',
    borderTop: '1px dashed #e8ead4',
    padding: '12px 0',
    marginBottom: 16,
  },
  cardMetaItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMetaLabel: {
    fontSize: '9px',
    fontWeight: 600,
    color: '#8c9273',
    letterSpacing: '0.05em',
    marginBottom: 2,
  },
  cardMetaVal: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1a1d10',
  },
  exercisesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: 20,
  },
  exerciseItem: {
    background: '#fcfdf6',
    border: '1px solid #f0f2db',
    borderRadius: '12px',
    padding: '12px',
  },
  exerciseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1a1d10',
  },
  exerciseStats: {
    fontSize: '11px',
    color: '#8c9273',
    fontWeight: 600,
  },
  exerciseSets: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  setTag: {
    fontSize: '11px',
    background: '#ffffff',
    border: '1px solid #e8ead4',
    borderRadius: '6px',
    padding: '3px 8px',
    color: '#444932',
  },
  consistencySection: {
    marginTop: '16px',
    borderTop: '1px solid #f0f2db',
    paddingTop: '16px',
  },
  progressBarBg: {
    width: '100%',
    height: '8px',
    background: '#f4f5df',
    borderRadius: '999px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: '#0058bc',
    borderRadius: '999px',
    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  sectionEyebrow: {
    fontSize: '12px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#536600',
    display: 'block',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#1a1d10',
    margin: 0,
    lineHeight: '1.2',
  },
  featureIcon: {
    fontSize: '28px',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1a1d10',
    margin: '0 0 8px 0',
  },
  featureText: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#444932',
    margin: 0,
  },
  quoteBlock: {
    marginTop: '48px',
    padding: '24px',
    borderRadius: '20px',
    background: 'linear-gradient(90deg, #f4f5df 0%, #edf0cc 100%)',
    border: '1px solid #e1e4c7',
    textAlign: 'center',
  },
  quoteText: {
    margin: 0,
    fontStyle: 'italic',
    color: '#444932',
    fontWeight: 600,
    fontSize: '15px',
  },
};
