import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import healthRoutes from './routes/healthRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kaamsetu';

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);
app.use('/api', workerRoutes);
app.use('/api', serviceRoutes);
app.use('/api', bookingRoutes);
app.use('/api', reviewRoutes);

// MongoDB connection attempt
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully:', MONGO_URI);
  })
  .catch((err) => {
    console.warn('⚠️ Could not connect to MongoDB:', err.message);
    console.warn('ℹ️ KaamSetu server running in standalone mode. Frontend fallback to mock data enabled.');
  });

app.listen(PORT, () => {
  console.log(`🚀 KaamSetu Backend Server running on http://localhost:${PORT}`);
});
