import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: { type: String },
  customerId: { type: String },
  customerName: { type: String },
  customerPhone: { type: String },
  workerId: { type: String },
  workerName: { type: String },
  workerSkill: { type: String },
  workerPhoto: { type: String },
  cooperativeId: { type: String },
  cooperativeName: { type: String },
  serviceId: { type: String },
  serviceName: { type: String },
  date: { type: String },
  time: { type: String },
  address: { type: String },
  location: { type: String },
  bookingDate: { type: String },
  problem: { type: String },
  amount: { type: String },
  paymentMethod: { type: String, default: 'Cash after Service' },
  paymentStatus: { type: String, default: 'Pending' },
  transactionId: { type: String },
  status: { 
    type: String, 
    enum: ['New', 'Confirmed & Worker Dispatched', 'Assigned', 'In Progress', 'Completed'], 
    default: 'New' 
  },
  createdAt: { type: String }
}, { timestamps: true, strict: false });

export default mongoose.model('Booking', bookingSchema);

