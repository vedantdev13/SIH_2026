import mongoose from 'mongoose';

const cooperativeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Cooperative', cooperativeSchema);
