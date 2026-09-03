import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Resolve DNS via Google/Cloudflare DNS for reliable MongoDB Atlas SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://itachix07x:ZGrDxaDDhgHxwhnz@cluster0.c4t9l7p.mongodb.net/kaamsetu?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', workerRoutes);
app.use('/api', serviceRoutes);
app.use('/api', bookingRoutes);
app.use('/api', reviewRoutes);

// MongoDB Cloud connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas Cloud successfully!');
  })
  .catch((err) => {
    console.warn('⚠️ Could not connect to MongoDB:', err.message);
    console.warn('ℹ️ KaamSetu server running in standalone mode. Frontend fallback to mock data enabled.');
  });

app.listen(PORT, () => {
  console.log(`🚀 KaamSetu Backend Server running on http://localhost:${PORT}`);
});
