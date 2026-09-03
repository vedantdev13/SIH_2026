import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET booking by ID
router.get('/bookings/:id', async (req, res) => {
  try {
    let booking = await Booking.findOne({ id: req.params.id });
    if (!booking && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      booking = await Booking.findById(req.params.id);
    }
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new booking
router.post('/bookings', async (req, res) => {
  try {
    const bookingData = { ...req.body };
    if (!bookingData.id) {
      bookingData.id = `SK-${Math.floor(10000 + Math.random() * 90000)}`;
    }
    const newBooking = new Booking(bookingData);
    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update booking
router.put('/bookings/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT assign worker to booking
router.put('/bookings/:id/assign', async (req, res) => {
  try {
    const { workerId, workerName } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id, 
      { workerId, workerName, status: 'Assigned' }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
