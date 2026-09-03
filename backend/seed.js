import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import dns from 'dns';

import Worker from './models/Worker.js';
import Service from './models/Service.js';
import Cooperative from './models/Cooperative.js';
import Booking from './models/Booking.js';
import User from './models/User.js';

// Resolve DNS via Google/Cloudflare DNS for reliable MongoDB Atlas SRV lookup
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://itachix07x:ZGrDxaDDhgHxwhnz@cluster0.c4t9l7p.mongodb.net/kaamsetu?retryWrites=true&w=majority';

const sampleWorkers = [
  {
    name: 'Ramesh Kumar',
    phone: '9823010101',
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
    phone: '9823010102',
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
    phone: '9823010103',
    skill: 'Carpenter',
    experience: '10 years',
    rating: 4.95,
    completedJobs: 640,
    availability: 'Available Now',
    verified: true,
    cooperativeId: 'ngp-crafts-coop',
    insuranceStatus: 'Cooperative Skill Guild Certified Master'
  },
  {
    name: 'Sunil Pawar',
    phone: '9823010104',
    skill: 'Painter',
    experience: '5 years',
    rating: 4.7,
    completedJobs: 210,
    availability: 'Scheduled Only',
    verified: true,
    cooperativeId: 'ngp-multi-coop',
    insuranceStatus: 'Cooperative Accident & Health Coverage'
  },
  {
    name: 'Pooja Jadhav',
    phone: '9823010105',
    skill: 'Cleaner',
    experience: '4 years',
    rating: 4.85,
    completedJobs: 430,
    availability: 'Available Now',
    verified: true,
    cooperativeId: 'ngp-multi-coop',
    insuranceStatus: 'Women Cooperative Self-Help Group Leader'
  }
];

const sampleServices = [
  { name: 'Plumber', description: 'Pipe leaks, bathroom fittings, tap repairs, motor installation', basePrice: 299, active: true },
  { name: 'Electrician', description: 'Wiring, MCB repair, switchboard setup, inverter check', basePrice: 349, active: true },
  { name: 'Carpenter', description: 'Furniture repair, door locks, modular kitchen adjustments', basePrice: 399, active: true },
  { name: 'Painter', description: 'Interior & exterior painting, wall touchups, waterproofing', basePrice: 499, active: true },
  { name: 'Cleaner', description: 'Deep house cleaning, sofa shampooing, kitchen degreasing', basePrice: 399, active: true },
  { name: 'Driver', description: 'On-demand personal drivers, verified licence holders', basePrice: 450, active: true },
  { name: 'Gardener', description: 'Lawn mowing, plant pruning, soil nourishment', basePrice: 350, active: true },
  { name: 'Technician', description: 'AC servicing, washing machine, refrigerator repair', basePrice: 449, active: true }
];

const sampleCooperatives = [
  { name: 'Nagpur Plumbing Labour Cooperative Society', location: 'Sitabuldi, Nagpur', phone: '+91 712 2541092', description: 'Reg No: NGP/COP/2018/892' },
  { name: 'Vidarbha Electrical Workers Sahakari Sanstha', location: 'Dharampeth, Nagpur', phone: '+91 712 2589012', description: 'Reg No: VDB/COP/2016/412' },
  { name: 'Nagpur Woodcraft & Carpentry Sahakari Sanstha', location: 'Sitabuldi & Sadar, Nagpur', phone: '+91 712 2567123', description: 'Reg No: NGP/COP/2019/105' },
  { name: 'Nagpur Multipurpose Labour Cooperative Federation', location: 'Entire Nagpur Urban', phone: '+91 712 2511008', description: 'Reg No: NGP/FED/2015/008' }
];

const sampleBookings = [
  {
    customerId: 'cust-101',
    workerId: 'w-101',
    cooperativeId: 'ngp-plumb-coop',
    serviceId: 'plumber',
    location: 'Flat 402, Green Valley Apartments, Sitabuldi, Nagpur',
    amount: '₹349',
    status: 'New',
    bookingDate: '2026-09-04'
  },
  {
    customerId: 'cust-102',
    workerId: 'w-102',
    cooperativeId: 'vid-elec-coop',
    serviceId: 'electrician',
    location: 'Dharampeth Main Road, Nagpur',
    amount: '₹399',
    status: 'Assigned',
    bookingDate: '2026-09-04'
  }
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB Atlas Cloud...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas Cloud!');

    await Worker.deleteMany({});
    await Service.deleteMany({});
    await Cooperative.deleteMany({});
    await Booking.deleteMany({});
    await User.deleteMany({});

    // Create demo users with hashed passwords
    const salt = await bcrypt.genSalt(10);
    const demoCustomerPass = await bcrypt.hash('demo123', salt);
    const demoCoopPass = await bcrypt.hash('coop123', salt);

    const sampleUsers = [
      {
        name: 'Demo Customer',
        phone: '9823011223',
        email: 'customer@kaamsetu.org',
        password: demoCustomerPass,
        role: 'customer'
      },
      {
        name: 'Nagpur Co-op Admin',
        phone: '9422100998',
        email: 'admin@kaamsetu.org',
        password: demoCoopPass,
        role: 'cooperative',
        cooperativeName: 'Nagpur Plumbing Labour Cooperative Society',
        registrationNo: 'NGP/COP/2018/892'
      }
    ];

    await Worker.insertMany(sampleWorkers);
    await Service.insertMany(sampleServices);
    await Cooperative.insertMany(sampleCooperatives);
    await Booking.insertMany(sampleBookings);
    await User.insertMany(sampleUsers);

    console.log('🎉 MongoDB Atlas Cloud database seeded with Workers, Services, Cooperatives, Bookings, and Users!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seedDB();
