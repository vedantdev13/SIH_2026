import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  workerId: { type: String, required: true },
  bookingId: { type: String },
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
