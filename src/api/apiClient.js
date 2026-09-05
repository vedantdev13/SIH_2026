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
    const saved = localStorage.getItem(`sahakaar_${key}`);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setStoredData = (key, val) => {
  try {
    localStorage.setItem(`sahakaar_${key}`, JSON.stringify(val));
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

// REVIEWS API
export const fetchReviewsApi = async (workerId = null) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      return workerId ? data.filter(r => r.workerId === workerId) : data;
    }
  } catch {}

  const reviews = getStoredData('reviews', [
    {
      id: 'rev-1',
      workerId: 'w-101',
      customerName: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent plumbing work! Came right on time and fixed the pipe leak cleanly.',
      tags: ['Punctual', 'Expert Work'],
      date: '2026-09-02'
    },
    {
      id: 'rev-2',
      workerId: 'w-101',
      customerName: 'Rajesh Patel',
      rating: 5,
      comment: 'Very polite behavior and honest cooperative pricing. Highly recommended!',
      tags: ['Polite', 'Fair Rate'],
      date: '2026-08-28'
    }
  ]);

  return workerId ? reviews.filter(r => r.workerId === workerId) : reviews;
};

export const createReviewApi = async (reviewData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (res.ok) return await res.json();
  } catch {}

  const reviews = getStoredData('reviews', []);
  const newReview = {
    id: `rev-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    ...reviewData
  };
  const updatedReviews = [newReview, ...reviews];
  setStoredData('reviews', updatedReviews);

  // Update worker rating summary
  if (reviewData.workerId) {
    const workers = getStoredData('workers', WORKERS);
    const targetWorker = workers.find(w => w.id === reviewData.workerId);
    if (targetWorker) {
      const newReviewsCount = (targetWorker.reviewsCount || 50) + 1;
      const newRating = parseFloat((((targetWorker.rating || 4.8) * targetWorker.reviewsCount + reviewData.rating) / newReviewsCount).toFixed(1));
      updateWorkerApi(reviewData.workerId, { rating: newRating, reviewsCount: newReviewsCount });
    }
  }

  // Update booking state if bookingId provided
  if (reviewData.bookingId) {
    const bookings = getStoredData('bookings', INITIAL_BOOKINGS);
    const updatedBookings = bookings.map(b => 
      b.id === reviewData.bookingId 
        ? { ...b, userRating: reviewData.rating, userReview: reviewData.comment, userTags: reviewData.tags } 
        : b
    );
    setStoredData('bookings', updatedBookings);
  }

  return newReview;
};

// WORKER REPORTS API
export const fetchReportsApi = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/reports`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return await res.json();
  } catch {}
  return getStoredData('reports', []);
};

export const createReportApi = async (reportData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    if (res.ok) return await res.json();
  } catch {}

  const reports = getStoredData('reports', []);
  const newReport = {
    id: `rpt-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString(),
    status: 'Pending Co-op Review',
    ...reportData
  };
  const updatedReports = [newReport, ...reports];
  setStoredData('reports', updatedReports);

  // Mark booking as reported
  if (reportData.bookingId) {
    const bookings = getStoredData('bookings', INITIAL_BOOKINGS);
    const updatedBookings = bookings.map(b => 
      b.id === reportData.bookingId 
        ? { ...b, isReported: true, reportReason: reportData.reason, reportNotes: reportData.notes } 
        : b
    );
    setStoredData('bookings', updatedBookings);
  }

  return newReport;
};

