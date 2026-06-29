// Simple test POST using node fetch
(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/user-123/sesiones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: 'Prueba',
        deporte: 'Correr',
        duracionMinutos: 45,
        nivel: 'intermedio',
        fecha: '2026-06-22',
      }),
    });

    const txt = await res.text();
    console.log('status:', res.status);
    console.log(txt);
  } catch (err) {
    console.error('error:', err);
    process.exit(1);
  }
})();
