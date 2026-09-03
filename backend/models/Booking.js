import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerId: { type: String },
  workerId: { type: String },
  cooperativeId: { type: String },
  serviceId: { type: String },
  location: { type: String },
  bookingDate: { type: String },
  amount: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Confirmed & Worker Dispatched', 'Assigned', 'In Progress', 'Completed'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
