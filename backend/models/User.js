import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'worker', 'cooperative', 'cooperative_admin'], 
    default: 'customer' 
  },
  cooperativeName: { type: String },
  tradeSkill: { type: String },
  registrationNo: { type: String }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
