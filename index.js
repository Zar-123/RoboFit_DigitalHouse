import dotenv from 'dotenv';
import app from './src/app.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start HTTP server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
};

await startServer();