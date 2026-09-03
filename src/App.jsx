import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import WorkerDetail from './pages/WorkerDetail';
import BookingPage from './pages/BookingPage';
import BookingConfirmation from './pages/BookingConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import CooperativeLayout from './pages/cooperative/CooperativeLayout';

import { WORKERS as INITIAL_WORKERS, SERVICES as INITIAL_SERVICES, INITIAL_BOOKINGS } from './data/mockData';
import { fetchBookings, fetchWorkers, fetchServices } from './api/apiClient';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper to conditionally show customer Navbar/Footer or render Admin full screen
function MainLayout({ children }) {
  const location = useLocation();
  const isCooperativeRoute = location.pathname.startsWith('/cooperative');

  if (isCooperativeRoute) {
    return <div className="min-h-screen font-sans">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [services, setServices] = useState(INITIAL_SERVICES);

  useEffect(() => {
    // Load initial state from API / Local Storage fallback
    fetchBookings().then(data => data && setBookings(data));
    fetchWorkers().then(data => data && setWorkers(data));
    fetchServices().then(data => data && setServices(data));
  }, []);

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/worker/:id" element={<WorkerDetail />} />
          <Route path="/book/:workerId" element={<BookingPage onAddBooking={handleAddBooking} />} />
          <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* COOPERATIVE ADMIN ROUTE GROUP */}
          <Route 
            path="/cooperative/*" 
            element={
              <CooperativeLayout 
                bookings={bookings} 
                setBookings={setBookings}
                workers={workers}
                setWorkers={setWorkers}
                services={services}
                setServices={setServices}
              />
            } 
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}
