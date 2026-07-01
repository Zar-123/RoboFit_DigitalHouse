import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Start HTTP server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
};

await startServer();