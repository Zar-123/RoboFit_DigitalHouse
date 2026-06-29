// Simple test GET using node fetch
(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/user-123/sesiones', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    const txt = await res.text();
    console.log('status:', res.status);
    console.log(txt);
  } catch (err) {
    console.error('error:', err);
    process.exit(1);
  }
})();
