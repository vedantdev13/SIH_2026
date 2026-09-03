import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Worker from './models/Worker.js';
import Service from './models/Service.js';
import Cooperative from './models/Cooperative.js';
import Booking from './models/Booking.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kaamsetu';

const sampleWorkers = [
  {
    name: 'Ramesh Kumar',
    skill: 'Plumber',
    experience: '6 years',
    rating: 4.9,
    completedJobs: 380,
    availability: 'Available Now',
    verified: true,
    cooperativeId: 'ngp-plumb-coop',
    insuranceStatus: 'Active State Cooperative Medical & Life Insurance'
  },
  {
    name: 'Amit Sharma',
    skill: 'Electrician',
    experience: '8 years',
    rating: 4.8,
    completedJobs: 510,
    availability: 'Available Now',
    verified: true,
    cooperativeId: 'vid-elec-coop',
    insuranceStatus: 'Active Cooperative Pension & Welfare Fund'
  },
  {
    name: 'Suresh Vishwakarma',
    skill: 'Carpenter',
    experience: '10 years',
    rating: 4.95,
    completedJobs: 640,
    availability: 'Available Now',
    verified: true,
    cooperativeId: 'ngp-crafts-coop',
    insuranceStatus: 'Cooperative Skill Guild Certified Master'
  }
];

const sampleServices = [
  { name: 'Plumber', description: 'Pipe leaks, bathroom fittings, tap repairs', basePrice: 299, active: true },
  { name: 'Electrician', description: 'Wiring, MCB repair, switchboard setup', basePrice: 349, active: true },
  { name: 'Carpenter', description: 'Furniture repair, door locks, woodwork', basePrice: 399, active: true }
];

const sampleCooperatives = [
  { name: 'Nagpur Plumbing Labour Cooperative Society', location: 'Sitabuldi, Nagpur', description: 'Reg No: NGP/COP/2018/892' },
  { name: 'Vidarbha Electrical Workers Sahakari Sanstha', location: 'Dharampeth, Nagpur', description: 'Reg No: VDB/COP/2016/412' }
];

const sampleBookings = [
  {
    customerId: 'cust-101',
    workerId: 'w-101',
    location: 'Flat 402, Sitabuldi, Nagpur',
    amount: '₹349',
    status: 'New',
    bookingDate: '2026-09-04'
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Worker.deleteMany({});
    await Service.deleteMany({});
    await Cooperative.deleteMany({});
    await Booking.deleteMany({});

    await Worker.insertMany(sampleWorkers);
    await Service.insertMany(sampleServices);
    await Cooperative.insertMany(sampleCooperatives);
    await Booking.insertMany(sampleBookings);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedDB();
