import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import WorkerDetail from './pages/WorkerDetail';
import BookingPage from './pages/BookingPage';
import BookingConfirmation from './pages/BookingConfirmation';
import CooperativeDashboard from './pages/CooperativeDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { INITIAL_BOOKINGS } from './data/mockData';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/worker/:id" element={<WorkerDetail />} />
            <Route path="/book/:workerId" element={<BookingPage onAddBooking={handleAddBooking} />} />
            <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
            <Route path="/cooperative" element={<CooperativeDashboard bookings={bookings} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
