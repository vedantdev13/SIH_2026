import mongoose from 'mongoose';

const workerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80' 
  },
  skill: { type: String, required: true, default: 'Plumber' },
  experience: { type: String, default: '5 years' },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 24 },
  completedJobs: { type: Number, default: 0 },
  distance: { type: Number, default: 1.5 },
  approxPrice: { type: String, default: '₹349 per task' },
  hourlyRate: { type: Number, default: 349 },
  availability: { type: String, default: 'Available Now' },
  verified: { type: Boolean, default: true },
  cooperativeName: { type: String, default: 'Nagpur Labour Cooperative Society' },
  cooperativeId: { type: String, default: 'ngp-plumb-coop' },
  badge: { type: String, default: 'Verified Cooperative Member' },
  locality: { type: String, default: 'Nagpur Central' },
  lat: { type: Number, default: 21.1458 },
  lng: { type: Number, default: 79.0882 },
  about: { 
    type: String, 
    default: 'Master tradesperson with hands-on experience in domestic and commercial repairs. Verified member of Nagpur Labour Cooperative.' 
  },
  welfareStatus: { 
    type: String, 
    default: 'Covered under State Cooperative Medical & Life Insurance Policy' 
  },
  insuranceStatus: { 
    type: String, 
    default: 'Active Cooperative Medical Insurance (₹3,00,000 cover)' 
  },
  workerId: {
    type: String,
    unique: true,
    sparse: true
  }
}, { timestamps: true });

// Auto-generate a stable user-facing Worker ID before first save
workerSchema.pre('save', function(next) {
  if (!this.workerId) {
    // Derive a numeric suffix from the ObjectId hex (last 6 hex chars -> decimal, mod 90000 + 10000)
    const hex = this._id.toHexString().slice(-6);
    const num = parseInt(hex, 16) % 90000 + 10000;
    this.workerId = `SK-W${num}`;
  }
  next();
});

export default mongoose.model('Worker', workerSchema);
