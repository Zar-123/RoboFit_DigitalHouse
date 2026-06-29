import express from 'express';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Main routes
app.use(indexRoutes);

export default app;