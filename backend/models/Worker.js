import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  skill: { type: String, required: true },
  experience: { type: String },
  rating: { type: Number, default: 4.8 },
  completedJobs: { type: Number, default: 0 },
  availability: { type: String, default: 'Available Now' },
  verified: { type: Boolean, default: true },
  cooperativeId: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  insuranceStatus: { type: String, default: 'Active Cooperative Medical Insurance' }
}, { timestamps: true });

export default mongoose.model('Worker', workerSchema);
