import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import consultRoutes from './routes/consult.routes.js';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/consult', consultRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

export default app;
