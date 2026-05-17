import { useState } from 'react';
import api from './api/axios';

function App() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const response = await api.get('/api/ping');
      setStatus(response.data);
    } catch (err) {
      setError('❌ Erreur de connexion : ' + (err.message || 'Impossible de joindre le backend.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 Test de Connexion</h1>
        <p style={styles.subtitle}>Frontend React ↔ Backend Laravel</p>

        <div style={styles.stack}>
          <span style={{ ...styles.badge, backgroundColor: '#61dafb22', color: '#61dafb' }}>⚛️ React 19</span>
          <span style={styles.arrow}>↔</span>
          <span style={{ ...styles.badge, backgroundColor: '#FF2D2022', color: '#FF2D20' }}>🐘 Laravel 12</span>
        </div>

        <button
          id="test-btn"
          onClick={testConnection}
          disabled={loading}
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '⏳ Test en cours...' : '🚀 Tester la connexion'}
        </button>

        {status && (
          <div style={{ ...styles.result, backgroundColor: '#16a34a22', borderColor: '#16a34a' }}>
            <p style={{ color: '#4ade80', fontWeight: 'bold', margin: 0 }}>{status.message}</p>
            <p style={{ color: '#86efac', margin: '8px 0 0', fontSize: '14px' }}>⏰ {status.time}</p>
          </div>
        )}

        {error && (
          <div style={{ ...styles.result, backgroundColor: '#dc262622', borderColor: '#dc2626' }}>
            <p style={{ color: '#f87171', margin: 0 }}>{error}</p>
            <p style={{ color: '#fca5a5', margin: '8px 0 0', fontSize: '13px' }}>
              Assurez-vous que Laravel tourne sur <code>http://localhost:8000</code>
            </p>
          </div>
        )}

        <p style={styles.hint}>URL testée : <code style={styles.code}>GET /api/ping</code></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '48px',
    textAlign: 'center',
    maxWidth: '480px',
    width: '90%',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  title: {
    color: '#fff',
    fontSize: '28px',
    margin: '0 0 8px',
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '15px',
    margin: '0 0 32px',
  },
  stack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  badge: {
    padding: '8px 16px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
  },
  arrow: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '20px',
  },
  button: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 32px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
    display: 'block',
    width: '100%',
    marginBottom: '24px',
  },
  result: {
    border: '1px solid',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
    textAlign: 'left',
  },
  hint: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '13px',
    margin: 0,
  },
  code: {
    background: 'rgba(255,255,255,0.1)',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#a78bfa',
  },
};

export default App;
