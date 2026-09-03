import { WORKERS, SERVICES, INITIAL_BOOKINGS, LABOUR_COOPERATIVES } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper to check if backend is alive
let isBackendAvailable = null;

export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      isBackendAvailable = true;
      return data;
    }
  } catch (err) {
    isBackendAvailable = false;
  }
  return null;
};

// Local storage persistent fallback state
const getStoredData = (key, defaultVal) => {
  try {
    const saved = localStorage.getItem(`kaamsetu_${key}`);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStoredData = (key, val) => {
  try {
    localStorage.setItem(`kaamsetu_${key}`, JSON.stringify(val));
  } catch (e) {
    console.error('Storage save error:', e);
  }
};

// WORKERS API
export const fetchWorkers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/workers`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return getStoredData('workers', WORKERS);
};

export const updateWorkerApi = async (id, updateData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/workers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (res.ok) return await res.json();
  } catch {}
  
  // Local fallback
  const workers = getStoredData('workers', WORKERS);
  const updated = workers.map(w => w.id === id ? { ...w, ...updateData } : w);
  setStoredData('workers', updated);
  return updated.find(w => w.id === id);
};

// SERVICES API
export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {}
  return getStoredData('services', SERVICES);
};

export const toggleServiceApi = async (id, activeState) => {
  const services = getStoredData('services', SERVICES);
  const updated = services.map(s => s.id === id ? { ...s, active: activeState } : s);
  setStoredData('services', updated);
  return updated;
};

// BOOKINGS API
export const fetchBookings = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {}
  return getStoredData('bookings', INITIAL_BOOKINGS);
};

export const createBookingApi = async (bookingData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (res.ok) return await res.json();
  } catch {}

  const bookings = getStoredData('bookings', INITIAL_BOOKINGS);
  const newBooking = {
    id: `KS-${Math.floor(10000 + Math.random() * 90000)}`,
    status: 'New',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    ...bookingData
  };
  const updated = [newBooking, ...bookings];
  setStoredData('bookings', updated);
  return newBooking;
};

export const updateBookingStatusApi = async (id, status, workerId = null, workerName = null) => {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, workerId, workerName })
    });
    if (res.ok) return await res.json();
  } catch {}

  const bookings = getStoredData('bookings', INITIAL_BOOKINGS);
  const updated = bookings.map(b => {
    if (b.id === id) {
      return { 
        ...b, 
        status, 
        ...(workerId ? { workerId } : {}), 
        ...(workerName ? { workerName } : {}) 
      };
    }
    return b;
  });
  setStoredData('bookings', updated);
  return updated;
};
